export default function Title({ title, textLeft }) {
  let classes =
    "uppercase w-48 h-10 pt-2 font-semibold bg-gray-200 text-center text-blue-500 mt-16 mb-6 rounded";

  if (!textLeft) {
    classes += " mx-auto";
  }

  return <h2 className={classes}>{title}</h2>;
}
