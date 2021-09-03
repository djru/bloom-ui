export const passwordIsGood = (pw) => {
  return (
    "1234567890".split("").some((v) => pw.includes(v)) &&
    "`!@#$%^&*()_+[]{}|`".split("").some((v) => pw.includes(v)) &&
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").some((v) => pw.includes(v)) &&
    pw.length >= 8
  );
};

export default passwordIsGood;
