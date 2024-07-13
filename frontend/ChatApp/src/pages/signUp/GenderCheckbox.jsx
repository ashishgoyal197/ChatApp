export default function GenderCheckbox(props) {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            props.selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-black">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={props.selectedGender === "male"}
            onChange={() => props.onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            props.selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-black">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={props.selectedGender === "female"}
            onChange={() => props.onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
}
