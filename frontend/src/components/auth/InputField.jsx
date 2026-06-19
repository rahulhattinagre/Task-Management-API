import PropTypes from 'prop-types';

export default function InputField({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  rightSlot,
  autoComplete,
  required = false,
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/90">
          {label}
          {required && <span className="ml-1 text-sky-300/80">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full rounded-\[16px\] border border-white/10 bg-\[rgba\(8,17,34,0.55\)] px-4 py-3 text-sm text-white/95 outline-none transition focus:border-sky-400/70 focus:ring-2 focus:ring-sky-400/20"
        />

        {rightSlot && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rightSlot: PropTypes.node,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
};

