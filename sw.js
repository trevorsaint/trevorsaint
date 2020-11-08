var cacheName = 'ts';


var filesToCache = [

  '/',
  '/about/',
  '/projects/',
  '/testimonials/',
  '/contact/',
  '/contact/thank-you/',
  '/page-not-found/',

  // Fonts
  '/fonts/Baskerville.woff',
  '/fonts/Baskerville.woff2',
  '/fonts/Moderat-Regular.woff',
  '/fonts/Moderat-Regular.woff2',
  '/fonts/Moderat-Bold.woff',
  '/fonts/Moderat-Bold.woff2',

  // Support
  '/support/accessibility/',
  '/support/cookies/',
  '/support/privacy/',

  // Projects
  '/projects/census-2021/',
  '/projects/government-digital-service/',
  '/projects/hmcts-design-system/',
  '/projects/judicial-case-manager/',
  '/projects/max-powder/',
  '/projects/paramount-packaging/',
  '/projects/rural-payments/',
  '/projects/servelec-social-care/',
  '/projects/travalion/',

  // Stylesheet and Script
  '/stylesheets/main.min.css',
  '/javascripts/scripts.min.js',

  // Manifest
  '/manifest.json',

  // Icons
  '/images/apple-icon-57x57.png',
  '/images/apple-icon-60x60.png',
  '/images/apple-icon-72x72.png',
  '/images/apple-icon-76x76.png',
  '/images/apple-icon-114x114.png',
  '/images/apple-icon-120x120.png',
  '/images/apple-icon-144x144.png',
  '/images/apple-icon-152x152.png',
  '/images/apple-icon-180x180.png',

  '/images/icon-57x57.png',
  '/images/icon-60x60.png',
  '/images/icon-72x72.png',
  '/images/icon-76x76.png',
  '/images/icon-114x114.png',
  '/images/icon-128x128.png',
  '/images/icon-144x144.png',
  '/images/icon-152x152.png',
  '/images/icon-192x192.png',
  '/images/icon-384x384.png',
  '/images/icon-512x512.png',

  '/images/icon-maskable.png',
  '/images/opengraph.png',
  '/images/twitter.png',
  '/images/favicon.svg',

  // UI
  '/images/background-top.svg',
  '/images/background-bottom.svg',


  // Client logos
  '/images/clients/ons.svg',
  '/images/clients/govuk.svg',
  '/images/clients/servelec.svg',
  '/images/clients/elsevier.svg',
  '/images/clients/hmcts.svg',
  '/images/clients/moj.svg',
  '/images/clients/premier-league.svg',
  '/images/clients/rural-payments-agency.svg',
  '/images/clients/nike.svg',
  '/images/clients/akqa.svg',
  '/images/clients/thefa.svg',
  '/images/clients/kainos.svg',
  '/images/clients/capita.svg',
  '/images/clients/paramount-packaging.svg',
  '/images/clients/max-powder.svg',
  '/images/clients/motilo.svg',
  '/images/clients/conchango.svg',

  // Technology logos
  '/images/technologies/git.svg',
  '/images/technologies/sass.svg',
  '/images/technologies/heroku.svg',
  '/images/technologies/gulp.svg',
  '/images/technologies/npm.svg',
  '/images/technologies/craft.svg',
  '/images/technologies/expression-engine.svg',
  '/images/technologies/vscode.svg',
  '/images/technologies/sketch.svg',
  '/images/technologies/firebase.svg',
  '/images/technologies/nodejs.svg',
  '/images/technologies/netlify.svg',
  '/images/technologies/gcp.svg',

  // Census 2021 images
  '/images/projects/project/census-2021/feature.png',
  '/images/projects/project/census-2021/feature@2x.png',
  '/images/projects/project/census-2021/feature@3x.png',

  '/images/projects/project/census-2021/hero.png',
  '/images/projects/project/census-2021/hero@2x.png',

  '/images/projects/project/census-2021/project.png',
  '/images/projects/project/census-2021/project@2x.png',

  '/images/projects/project/census-2021/engagement-landing-page-design-for-england.png',
  '/images/projects/project/census-2021/engagement-landing-page-design-for-england@2x.png',

  '/images/projects/project/census-2021/downloadable-resources-pattern.png',
  '/images/projects/project/census-2021/downloadable-resources-pattern@2x.png',

  '/images/projects/project/census-2021/prototyping-downloadable-resources.png',
  '/images/projects/project/census-2021/prototyping-downloadable-resources@2x.png',

  '/images/projects/project/census-2021/engage-phase-banner-design.png',
  '/images/projects/project/census-2021/engage-phase-banner-design@2x.png',

  '/images/projects/project/census-2021/respond-phase-banner-design.png',
  '/images/projects/project/census-2021/respond-phase-banner-design@2x.png',

  '/images/projects/project/census-2021/design-system-involvement.png',
  '/images/projects/project/census-2021/design-system-involvement@2x.png',


  // Government Digital Service images
  '/images/projects/project/government-digital-service/feature.png',
  '/images/projects/project/government-digital-service/feature@2x.png',

  '/images/projects/project/government-digital-service/hero.png',
  '/images/projects/project/government-digital-service/hero@2x.png',

  '/images/projects/project/government-digital-service/project.png',
  '/images/projects/project/government-digital-service/project@2x.png',

  '/images/projects/project/government-digital-service/brexit-checker-user-flow-on-mobile.png',
  '/images/projects/project/government-digital-service/brexit-checker-user-flow-on-mobile@2x.png',

  '/images/projects/project/government-digital-service/popup-user-testing-kings-cross.jpg',
  '/images/projects/project/government-digital-service/popup-user-testing-kings-cross@2x.jpg',

  '/images/projects/project/government-digital-service/popup-user-testing-kings-cross-team.jpg',
  '/images/projects/project/government-digital-service/popup-user-testing-kings-cross-team@2x.jpg',

  '/images/projects/project/government-digital-service/business-sector-interaction-design-on-mobile.png',
  '/images/projects/project/government-digital-service/business-sector-interaction-design-on-mobile@2x.png',

  '/images/projects/project/government-digital-service/prototyping-in-code-for-government.png',
  '/images/projects/project/government-digital-service/prototyping-in-code-for-government@2x.png',

  '/images/projects/project/government-digital-service/eu-funding-interaction-design-sketch.png',
  '/images/projects/project/government-digital-service/eu-funding-interaction-design-sketch@2x.png',

  '/images/projects/project/government-digital-service/proposed-user-flow-for-gov-email-subscriptions.png',
  '/images/projects/project/government-digital-service/proposed-user-flow-for-gov-email-subscriptions@2x.png',

  '/images/projects/project/government-digital-service/email-subscription-user-journey-on-mobile.png',
  '/images/projects/project/government-digital-service/email-subscription-user-journey-on-mobile@2x.png',


  // HMCTS Design System images
  '/images/projects/project/hmcts-design-system/feature.png',
  '/images/projects/project/hmcts-design-system/feature@2x.png',

  '/images/projects/project/hmcts-design-system/hero.png',
  '/images/projects/project/hmcts-design-system/hero@2x.png',

  '/images/projects/project/hmcts-design-system/project.png',
  '/images/projects/project/hmcts-design-system/project@2x.png',

  '/images/projects/project/hmcts-design-system/home-page.png',
  '/images/projects/project/hmcts-design-system/home-page@2x.png',

  '/images/projects/project/hmcts-design-system/progress-bar-component.png',
  '/images/projects/project/hmcts-design-system/progress-bar-component@2x.png',

  '/images/projects/project/hmcts-design-system/pagination-component.png',
  '/images/projects/project/hmcts-design-system/pagination-component@2x.png',

  '/images/projects/project/hmcts-design-system/service-using-design-system.png',
  '/images/projects/project/hmcts-design-system/service-using-design-system@2x.png',

  '/images/projects/project/hmcts-design-system/contributors-to-design-system.png',
  '/images/projects/project/hmcts-design-system/contributors-to-design-system@2x.png',

  '/images/projects/project/hmcts-design-system/collaboration-on-github.png',
  '/images/projects/project/hmcts-design-system/collaboration-on-github@2x.png',

  '/images/projects/project/hmcts-design-system/frontend-package-release.png',
  '/images/projects/project/hmcts-design-system/frontend-package-release@2x.png',


  // Judicial Case Manager images
  '/images/projects/project/judicial-case-manager/feature.png',
  '/images/projects/project/judicial-case-manager/feature@2x.png',

  '/images/projects/project/judicial-case-manager/hero.png',
  '/images/projects/project/judicial-case-manager/hero@2x.png',

  '/images/projects/project/judicial-case-manager/project.png',
  '/images/projects/project/judicial-case-manager/project@2x.png',

  '/images/projects/project/judicial-case-manager/mockups-to-tease-user-requirements.png',
  '/images/projects/project/judicial-case-manager/mockups-to-tease-user-requirements@2x.png',

  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-1.jpg',
  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-1@2x.jpg',

  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-2.jpg',
  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-2@2x.jpg',

  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-3.jpg',
  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-3@2x.jpg',

  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-4.jpg',
  '/images/projects/project/judicial-case-manager/hand-drawn-sketches-4@2x.jpg',

  '/images/projects/project/judicial-case-manager/digital-case-file-design.png',
  '/images/projects/project/judicial-case-manager/digital-case-file-design@2x.png',

  '/images/projects/project/judicial-case-manager/questions-and-answers-design.png',
  '/images/projects/project/judicial-case-manager/questions-and-answers-design@2x.png',

  '/images/projects/project/judicial-case-manager/case-details-landing-page-design.png',
  '/images/projects/project/judicial-case-manager/case-details-landing-page-design@2x.png',

  '/images/projects/project/judicial-case-manager/user-testing-with-a-judge.png',
  '/images/projects/project/judicial-case-manager/user-testing-with-a-judge@2x.png',

  '/images/projects/project/judicial-case-manager/user-testing-with-a-judge.jpg',
  '/images/projects/project/judicial-case-manager/user-testing-with-a-judge@2x.jpg',

  '/images/projects/project/judicial-case-manager/divorce-user-journey-designs.png',
  '/images/projects/project/judicial-case-manager/divorce-user-journey-designs@2x.png',


  // Max Powder images
  '/images/projects/project/max-powder/feature.png',
  '/images/projects/project/max-powder/feature@2x.png',

  '/images/projects/project/max-powder/hero.png',
  '/images/projects/project/max-powder/hero@2x.png',

  '/images/projects/project/max-powder/project.png',
  '/images/projects/project/max-powder/project@2x.png',

  '/images/projects/project/max-powder/photography-style.jpg',
  '/images/projects/project/max-powder/photography-style@2x.jpg',

  '/images/projects/project/max-powder/on-samsung-phone.png',
  '/images/projects/project/max-powder/on-samsung-phone@2x.png',

  '/images/projects/project/max-powder/logo-ondark.png',
  '/images/projects/project/max-powder/logo-ondark@2x.png',

  '/images/projects/project/max-powder/logo-onlight.png',
  '/images/projects/project/max-powder/logo-onlight@2x.png',

  '/images/projects/project/max-powder/styleguide-styles.png',
  '/images/projects/project/max-powder/styleguide-styles@2x.png',

  '/images/projects/project/max-powder/styleguide-components.png',
  '/images/projects/project/max-powder/styleguide-components@2x.png',

  '/images/projects/project/max-powder/home-page-design.png',
  '/images/projects/project/max-powder/home-page-design@2x.png',

  '/images/projects/project/max-powder/gallery-page-design.png',
  '/images/projects/project/max-powder/gallery-page-design@2x.png',

  '/images/projects/project/max-powder/expression-engine-cms.png',
  '/images/projects/project/max-powder/expression-engine-cms@2x.png',


  // Paramount Packaging images
  '/images/projects/project/paramount-packaging/feature.png',
  '/images/projects/project/paramount-packaging/feature@2x.png',

  '/images/projects/project/paramount-packaging/hero.png',
  '/images/projects/project/paramount-packaging/hero@2x.png',

  '/images/projects/project/paramount-packaging/project.png',
  '/images/projects/project/paramount-packaging/project@2x.png',

  '/images/projects/project/paramount-packaging/closeup-fuji-machine-tray.jpg',
  '/images/projects/project/paramount-packaging/closeup-fuji-machine-tray@2x.jpg',

  '/images/projects/project/paramount-packaging/on-iphone.png',
  '/images/projects/project/paramount-packaging/on-iphone@2x.png',

  '/images/projects/project/paramount-packaging/ppma-exhibition-event-at-nec.jpg',
  '/images/projects/project/paramount-packaging/ppma-exhibition-event-at-nec@2x.jpg',

  '/images/projects/project/paramount-packaging/management-charles-ingham.jpg',
  '/images/projects/project/paramount-packaging/management-charles-ingham@2x.jpg',

  '/images/projects/project/paramount-packaging/management-aaron-bessell.jpg',
  '/images/projects/project/paramount-packaging/management-aaron-bessell@2x.jpg',

  '/images/projects/project/paramount-packaging/management-darren-bull.jpg',
  '/images/projects/project/paramount-packaging/management-darren-bull@2x.jpg',

  '/images/projects/project/paramount-packaging/management-placeholder.svg',

  '/images/projects/project/paramount-packaging/meat-fish-poultry-photography.jpg',
  '/images/projects/project/paramount-packaging/meat-fish-poultry-photography@2x.jpg',

  '/images/projects/project/paramount-packaging/bakery-photography.jpg',
  '/images/projects/project/paramount-packaging/bakery-photography@2x.jpg',

  '/images/projects/project/paramount-packaging/styleguide-design-foundations.png',
  '/images/projects/project/paramount-packaging/styleguide-design-foundations@2x.png',

  '/images/projects/project/paramount-packaging/styleguide-designed-components.png',
  '/images/projects/project/paramount-packaging/styleguide-designed-components@2x.png',

  '/images/projects/project/paramount-packaging/home-page-design.png',
  '/images/projects/project/paramount-packaging/home-page-design@2x.png',

  '/images/projects/project/paramount-packaging/client-management-online-content.png',
  '/images/projects/project/paramount-packaging/client-management-online-content@2x.png',



  // Rural Payments images
  '/images/projects/project/rural-payments/feature.png',
  '/images/projects/project/rural-payments/feature@2x.png',

  '/images/projects/project/rural-payments/hero.png',
  '/images/projects/project/rural-payments/hero@2x.png',

  '/images/projects/project/rural-payments/project.png',
  '/images/projects/project/rural-payments/project@2x.png',

  '/images/projects/project/rural-payments/sign-in-to-rural-payments.png',
  '/images/projects/project/rural-payments/sign-in-to-rural-payments@2x.png',

  '/images/projects/project/rural-payments/managing-your-business.png',
  '/images/projects/project/rural-payments/managing-your-business@2x.png',

  '/images/projects/project/rural-payments/management-of-accountable-people.png',
  '/images/projects/project/rural-payments/management-of-accountable-people@2x.png',

  '/images/projects/project/rural-payments/management-of-land-parcels.png',
  '/images/projects/project/rural-payments/management-of-land-parcels@2x.png',

  '/images/projects/project/rural-payments/management-of-business-details.png',
  '/images/projects/project/rural-payments/management-of-business-details@2x.png',

  '/images/projects/project/rural-payments/management-of-your-account.png',
  '/images/projects/project/rural-payments/management-of-your-account@2x.png',


  // Servelec Social Care images
  '/images/projects/project/servelec-social-care/feature.png',
  '/images/projects/project/servelec-social-care/feature@2x.png',

  '/images/projects/project/servelec-social-care/hero.png',
  '/images/projects/project/servelec-social-care/hero@2x.png',

  '/images/projects/project/servelec-social-care/project.png',
  '/images/projects/project/servelec-social-care/project@2x.png',

  '/images/projects/project/servelec-social-care/design-system.png',
  '/images/projects/project/servelec-social-care/design-system@2x.png',

  '/images/projects/project/servelec-social-care/panel-components.png',
  '/images/projects/project/servelec-social-care/panel-components@2x.png',

  '/images/projects/project/servelec-social-care/demographic-information-panel.png',
  '/images/projects/project/servelec-social-care/demographic-information-panel@2x.png',

  '/images/projects/project/servelec-social-care/personal-summary.png',
  '/images/projects/project/servelec-social-care/personal-summary@2x.png',

  '/images/projects/project/servelec-social-care/team-workview.png',
  '/images/projects/project/servelec-social-care/team-workview@2x.png',


  // Travalion
  '/images/projects/project/travalion/feature.png',
  '/images/projects/project/travalion/feature@2x.png',

  '/images/projects/project/travalion/hero.png',
  '/images/projects/project/travalion/hero@2x.png',

  '/images/projects/project/travalion/project.png',
  '/images/projects/project/travalion/project@2x.png',

  '/images/projects/project/travalion/happy-landing-page-design.png',
  '/images/projects/project/travalion/happy-landing-page-design@2x.png',

  '/images/projects/project/travalion/logo-ondark.png',
  '/images/projects/project/travalion/logo-ondark@2x.png',

  '/images/projects/project/travalion/logo-onlight.png',
  '/images/projects/project/travalion/logo-onlight@2x.png',

  '/images/projects/project/travalion/styleguide-design-foundations.png',
  '/images/projects/project/travalion/styleguide-design-foundations@2x.png',

  '/images/projects/project/travalion/styleguide-designed-components.png',
  '/images/projects/project/travalion/styleguide-designed-components@2x.png',

  '/images/projects/project/travalion/styleguide-reusable-patterns.png',
  '/images/projects/project/travalion/styleguide-reusable-patterns@2x.png',

  '/images/projects/project/travalion/accessible-code.png',
  '/images/projects/project/travalion/accessible-code@2x.png',

  '/images/projects/project/travalion/complete-user-journey-page-designs.png',
  '/images/projects/project/travalion/complete-user-journey-page-designs@2x.png',


];


// Start the service worker and cache all of the app’s content
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});


// Serve cached content when offline
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});