import cameraIcon from "@/shared/assets/svg/ic-camera.svg";
import coffeeIcon from "@/shared/assets/svg/ic-coffee.svg";
import mountainIcon from "@/shared/assets/svg/ic-mountain.svg";
import shoppingBagIcon from "@/shared/assets/svg/ic-shopping-bag.svg";
import utensilsIcon from "@/shared/assets/svg/ic-utensils.svg";
import wavesIcon from "@/shared/assets/svg/ic-waves-horizontal.svg";

export type TravelStyleOption = {
  id: string;
  label: string;
  icon: string;
};

export const travelStyleOptions: TravelStyleOption[] = [
  {
    id: "local-food",
    label: "부산 로컬 맛집",
    icon: utensilsIcon,
  },
  {
    id: "cafe",
    label: "감성 카페",
    icon: coffeeIcon,
  },
  {
    id: "beach",
    label: "해변 관광",
    icon: wavesIcon,
  },
  {
    id: "photo-spot",
    label: "포토 스팟",
    icon: cameraIcon,
  },
  {
    id: "market",
    label: "전통시장",
    icon: shoppingBagIcon,
  },
  {
    id: "nature",
    label: "자연 / 산책",
    icon: mountainIcon,
  },
];
