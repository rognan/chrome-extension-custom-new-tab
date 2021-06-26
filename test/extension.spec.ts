import {chromium, expect, test} from '@playwright/test';
import {lighthouseReport} from './lighthouse/';
import * as path from "path";

test.describe('the new tab extension', () => {
  const target = `http://localhost:${process.env.PORT}/`;
  let browser;

  test.beforeAll(async () => {
    const extensionPath = path.join(__dirname, '../dist');
    browser = await chromium.launch({
      args: [
        '--browser-test',
        '--extensions-install-verification',
        `--remote-debugging-port=${process.env.DEBUG_PORT}`,
        // playwright doesn't support headless execution for extension install & test, see https://github.com/microsoft/playwright/issues/2172
        // while xvfb-run may be utilized to run these tests in headful mode on *nix systems (i.e `xvfb-run npm test` on CI server),
        // I don't much care for it. the following 2 lines are kept as a memorandum for when playwright eventually (probably never)
        // supports these types of tests, at which point the express server in the setup-script can be dispensed with.
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ],
      headless: true
    });
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.describe('when displaying content', () => {
    test.beforeEach(async ({page}) => {
      await page.goto(target)
    });

    test('create screenshot for pull request comment', async ({page}) => {
      await page.screenshot({path: "./build/playwright/screenshot.png", fullPage: true})
    });

    test('the document <title> is "New tab"', async ({page}) => {
      expect(await page.title()).toBe('New tab')
    });

    test('the current time is shown in the format of HH:mm', async ({page}) => {
      const actual = await page.innerText('time')

      expect(actual).toEqual(expect.stringMatching(/^\d{2}:\d{2}$/))
    });

    test('there are three headings', async ({page}) => {
      const expected = ['Learn', 'Make', 'Read'];

      const actual = await page.$$eval('h3', (elements) => {
        return elements.map(el => el.textContent.trim());
      });

      expect(actual).toEqual(expected);
    });

    test('The learn heading has three links', async ({page}) => {
      const learn = await page.$('h3:has-text("Learn")');
      const list = await learn.$('xpath=following-sibling::ul');
      const urls = await list.$$eval('a', anchors => {
        return anchors.map((anchor) => {
         return anchor.href;
        });
      });

      expect(urls).toEqual([
        'https://www.duolingo.com/',
        'https://www.khanacademy.org/',
        'https://www.codecademy.com/'
      ]);
    });

    test('The make heading has three links', async ({page}) => {
      const learn = await page.$('h3:has-text("Make")');
      const list = await learn.$('xpath=following-sibling::ul');
      const urls = await list.$$eval('a', anchors => {
        return anchors.map((anchor) => {
         return anchor.href;
        });
      });

      expect(urls).toEqual([
        'https://codepen.io/',
        'https://github.com/',
        'https://stackoverflow.com/'
      ]);
    });

    test('The read heading has two links', async ({page}) => {
      const learn = await page.$('h3:has-text("Read")');
      const list = await learn.$('xpath=following-sibling::ul');
      const urls = await list.$$eval('a', anchors => {
        return anchors.map((anchor) => {
         return anchor.href;
        });
      });

      expect(urls).toEqual([
        'https://www.reddit.com/',
        'https://news.ycombinator.com/'
      ]);
    });
  });

  test.describe('when audited with lighthouse', () => {
    let lhAudit;

    test.beforeAll(async () => {
      lhAudit = await lighthouseReport(target);
    });

    test('there are no runWarnings', async () => {
      expect(lhAudit.runWarnings).toHaveLength(0);
    });

    test('the accessibility score is at least 92', async () => {
      expect(lhAudit.categories.accessibility.score).toBeGreaterThanOrEqual(0.92);
    });

    test('the best-practices score is 100', async () => {
      expect(lhAudit.categories['best-practices'].score).toEqual(1.0);
    });
  });

  test.describe('when using the network', () => {
    test('makes no external requests', async ({page}) => {
      const expected = new URL(target);
      await page.route('**', route => {
        const actual = new URL(route.request().url());

        expect(actual.protocol).toBe(expected.protocol)
        expect(actual.host).toBe(expected.host)
        expect(actual.port).toBe(expected.port)

        route.continue();
      });

      await page.goto(target)
    });
  });

  test.describe('when installed', () => {
    test('the extension can be activated for incognito mode', async ({page}) => {
      test.skip(true,
        `Playwright doesn't support testing extensions in headless mode. This is left here as a memorandum.`
      );

      await page.goto('chrome://extensions')

      const detailsButton = await page.evaluateHandle(() =>
        document
          .querySelector('body > extensions-manager')
          .shadowRoot.querySelector('#items-list')
          .shadowRoot.querySelector('extensions-item')
          .shadowRoot.querySelector('#detailsButton')
      )

      await detailsButton.click()

      const incognitoToggle = await page.evaluateHandle(() =>
        document
          .querySelector('body > extensions-manager')
          .shadowRoot.querySelector('#viewManager > extensions-detail-view')
          .shadowRoot.querySelector('#allow-incognito')
      )

      await incognitoToggle.click();
    });
  });
});
