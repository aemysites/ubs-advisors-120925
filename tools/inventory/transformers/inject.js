/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console */
(() => {
  const el = document.querySelector('ul[data-slick-index="1"]');
  if (el) {
    el.remove();
  }

  const el2 = document.querySelector('.slick-prev.slick-arrow');
  if (el2) {
    el2.style.left = '0';
  }

  const el3 = document.querySelector('.slick-next.slick-arrow');
  if (el3) {
    el3.style.right = '0';
  }
})();
