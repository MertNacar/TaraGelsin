export const emailRegex = new RegExp(
  "^([a-zA-Z0-9_.+-]{1,28})@(hotmail|gmail|yahoo|gmx|ymail|outlook|live)(.com)$"
);
export const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,24}$"
);
export const commentRegex = new RegExp(
  "^[A-Za-z0-9_!()öçşığü#^?@.$%^&,\\s-]{0,40}$"
);
export const nameRegex = new RegExp("^[A-Za-zöçşığü]{3,20}$");
export const phoneRegex = new RegExp(
  "^[0-9]{7,14}$"
);
export const countryRegex = new RegExp(
  "^[A-Z]{2}$"
);
export const pageRegex = new RegExp(
  "^[0-9]{1,3}$"
);
export const uuidRegex = new RegExp(
  "^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$"
);
export const validateRegex = (typeRegex, input) => {
  return typeRegex.test(input);
};