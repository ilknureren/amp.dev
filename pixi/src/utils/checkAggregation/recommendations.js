// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Category} from '../../checks/PageExperienceCheck';

export const fixedRecommendations = ['intrusive-interstitials'];

const directLinterRecommendations = {
  usesHttps: 'https',
  isValid: 'valid-cached-amp',
  runtimeIsPreloaded: 'preload-amp-runtime',
  blockingExtensionsPreloaded: 'preload-render-blocking-extensions',
  fontsArePreloaded: 'preload-web-fonts',
  fastGoogleFontsDisplay: 'fast-font-display',
  googleFontPreconnect: 'preconnect-google-fonts',
  isTransformedAmp: 'use-amp-optimizer',
  moduleRuntimeIsUsed: 'enable-js-module-runtime',
  heroImageIsDefined: 'hero-images',
  noRenderBlockingExtension: 'prevent-render-blocking-extensions',
};

const directPageExperienceRecommendations = {
  usesAppropriatelySizedImages: 'appropriately-sized-images',
  textCompression: 'text-compression',
  fastServerResponse: 'server-response-time',
  usesOptimizedImages: 'optimized-images',
  usesWebpImages: 'next-gen-images',
  fastFontDisplay: 'fast-font-display',
  minifiedCss: 'minify-css',
};

const directSafeBrowsingRecommendations = {
  safeBrowsing: 'safe-browsing',
};

const directMobileFriendlinessRecommendations = {
  mobileFriendly: 'mobile-friendly',
  resourcesLoadable: 'resource-issues',
};

const addDirectRecommendations = (result, checks, mapping) => {
  for (const [check, status] of Object.entries(checks)) {
    if (status === false && mapping[check]) {
      const recommendation = {id: mapping[check]};
      if (checks.descriptions && checks.descriptions[check]) {
        recommendation.description = checks.descriptions[check];
      }
      result.push(recommendation);
    }
  }
};

const getMetricCategory = (dataNode, metricName) => {
  if (!dataNode) {
    return null;
  }
  const metric = dataNode[metricName];
  if (!metric) {
    return null;
  }
  return metric.data.category;
};

const getFieldOrLabDataCategory = (pageExperienceChecks, metricName) => {
  const pageExperience = pageExperienceChecks.pageExperience;
  return getMetricCategory(
    pageExperience.fieldData || pageExperience.labData,
    metricName
  );
};

export default async function getRecommendations(
  pageExperiencePromise,
  safeBrowsingPromise,
  linterPromise,
  mobileFriendlinessPromise
) {
  const [
    pageExperience,
    safeBrowsing,
    linter,
    mobileFriendliness,
  ] = await Promise.all([
    pageExperiencePromise,
    safeBrowsingPromise,
    linterPromise,
    mobileFriendlinessPromise,
  ]);

  const result = fixedRecommendations.map((id) => ({id}));

  addDirectRecommendations(result, linter, directLinterRecommendations);
  addDirectRecommendations(
    result,
    pageExperience,
    directPageExperienceRecommendations
  );
  addDirectRecommendations(
    result,
    safeBrowsing,
    directSafeBrowsingRecommendations
  );
  addDirectRecommendations(
    result,
    mobileFriendliness,
    directMobileFriendlinessRecommendations
  );

  if (linter.boilerplateIsRemoved === false) {
    if (linter.updateOptimizerForBoilerplateRemoval) {
      result.push({id: 'upgrade-amp-optimizer'});
    } else if (
      getFieldOrLabDataCategory(pageExperience, 'lcp') !== Category.FAST
    ) {
      result.push({id: 'amp-boilerplate-removal'});
    }
  }

  if (
    linter.noDynamicLayoutExtensions === false &&
    getFieldOrLabDataCategory(pageExperience, 'cls') !== Category.FAST
  ) {
    result.push({id: 'dynamic-layout-extensions'});
  }

  return result.filter(
    (item, i, ar) => ar.findIndex((checkItem) => checkItem.id === item.id) === i
  );
}
