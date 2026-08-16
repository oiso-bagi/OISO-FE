/**
 * 탭과 패널을 잇는 id.
 *
 * `role="tab"` 은 `aria-controls` 로 짝이 되는 `role="tabpanel"` 을 가리켜야
 * 계약이 완성됩니다. 패널은 탭 컴포넌트 바깥에서 렌더링되므로, 양쪽이 같은
 * id 를 만들 수 있도록 규칙만 공유합니다.
 */
export const tabId = (idBase: string, value: string) =>
  `${idBase}-tab-${value}`;

export const tabPanelId = (idBase: string, value: string) =>
  `${idBase}-panel-${value}`;
