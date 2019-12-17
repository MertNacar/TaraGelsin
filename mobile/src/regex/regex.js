export const emailRegex = new RegExp(
  "^([a-zA-Z0-9_.+-]{1,28})@(hotmail|gmail|yahoo|gmx|ymail|outlook|live)(.com)$"
);
export const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,24}$"
);
export const usernameRegex = new RegExp("^[A-Za-z0-9_-]{4,24}$");
export const aboutMeRegex = new RegExp(
  "^[A-Za-z0-9_!()öçşığü#^?@.$%^&,\\s-]{0,40}$"
);
export const nameRegex = new RegExp("^[A-Za-zöçşığü]{3,20}$");
export const phoneRegex = new RegExp(
  "(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})"
);
export const validateRegex = (typeRegex, input) => {
  return typeRegex.test(input);
};
