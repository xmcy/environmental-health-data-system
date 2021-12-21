import concat from "./concat";
import clickOutside from "./clickoutside";
export default (Vue: any) => {
    Vue.directive("concat", concat);
    Vue.directive("clickOutside", clickOutside);
};
