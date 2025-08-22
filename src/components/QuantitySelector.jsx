// src/components/QuantitySelector.jsx
export default function QuantitySelector({
  value = 1,
  onChange = () => {},
  min = 1,
  max = 10,
  inputId = "quantity",
  label = "Quantity",
}) {
  const clamp = (n) => Math.max(min, Math.min(max, n));

  const dec = () => onChange(clamp((Number(value) || min) - 1));
  const inc = () => onChange(clamp((Number(value) || min) + 1));

  const onInput = (e) => {
    const v = parseInt(e.target.value, 10);
    if (!Number.isNaN(v)) onChange(clamp(v));
    // if emptied or non-numeric, ignore; blur will correct
  };

  const onBlur = () => {
    const v = Number(value);
    if (Number.isNaN(v)) onChange(min);
    else onChange(clamp(v));
  };

  return (
    <div className="qty field">
      <label className="ff-label" htmlFor={inputId}>{label}</label>

      <div className="qty-row">
        <button type="button" onClick={dec} aria-label="Decrease quantity">−</button>

        <input
          id={inputId}
          className="ff-input"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={onInput}
          onBlur={onBlur}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={Number(value) || min}
          aria-label="Quantity"
        />

        <button type="button" onClick={inc} aria-label="Increase quantity">+</button>
      </div>

      <p className="qty-hint">Min {min} · Max {max}</p>
    </div>
  );
}
