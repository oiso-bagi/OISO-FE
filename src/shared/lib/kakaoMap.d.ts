/**
 * 카카오맵 JS SDK 최소 타입 선언.
 * 별도 @types 패키지 없이 이 프로젝트에서 사용하는 API 만 선언합니다.
 */
declare namespace kakao.maps {
  function load(callback: () => void): void;

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class LatLngBounds {
    constructor();
    extend(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setBounds(bounds: LatLngBounds): void;
    getCenter(): LatLng;
    setCenter(latlng: LatLng): void;
    relayout(): void;
    /** 지도 중심을 픽셀 단위로 부드럽게 옮깁니다. 양수면 중심이 오른쪽·아래로 갑니다. */
    panBy(dx: number, dy: number): void;
  }

  interface PolylineOptions {
    path: LatLng[];
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeStyle?: string;
  }

  class Polyline {
    constructor(options: PolylineOptions);
    setMap(map: Map | null): void;
  }

  interface CustomOverlayOptions {
    position: LatLng;
    content: string | HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
    /** true 면 오버레이를 누를 때 지도 클릭 이벤트가 발생하지 않습니다. */
    clickable?: boolean;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
    setZIndex(zIndex: number): void;
  }

  namespace event {
    function addListener(target: Map, type: string, handler: () => void): void;
    function removeListener(
      target: Map,
      type: string,
      handler: () => void,
    ): void;
  }
}

interface Window {
  kakao: typeof kakao;
}
