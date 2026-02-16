import { useCallback, useMemo, useRef, useState } from "react";

function defaultGetNextValue(target) {
  const { type, value, checked } = target;

  if (type === "checkbox") return checked;

  if (type === "number") {
    if (value === "") return "";
    const asNumber = Number(value);
    return Number.isNaN(asNumber) ? "" : asNumber;
  }

  return value;
}

function makeAllTouched(values) {
  const nextTouched = {};
  for (const key of Object.keys(values)) nextTouched[key] = true;
  return nextTouched;
}

/**
 * Minimal form hook (controlled inputs): manages values, touched, errors, submit.
 *
 * @param {Object} options
 * @param {Object} options.initialValues
 * @param {(values: any) => Object} [options.validate] - return { fieldName: message }
 * @param {(values: any, helpers: any) => void|Promise<void>} [options.onSubmit]
 * @param {boolean} [options.validateOnChange]
 * @param {boolean} [options.validateOnBlur]
 * @param {(target: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement) => any} [options.getNextValue]
 */
export function useForm({
  initialValues,
  validate,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
  getNextValue = defaultGetNextValue,
}) {
  const initialValuesRef = useRef(initialValues);

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(() => {
    const nextTouched = {};
    for (const key of Object.keys(initialValues)) nextTouched[key] = false;
    return nextTouched;
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const runValidate = useCallback(
    (nextValues) => {
      if (!validate) {
        setErrors({});
        return {};
      }

      const nextErrors = validate(nextValues) || {};
      setErrors(nextErrors);
      return nextErrors;
    },
    [validate],
  );

  const setFieldValue = useCallback(
    (name, value, { shouldValidate = validateOnChange } = {}) => {
      setValues((prev) => {
        const nextValues = { ...prev, [name]: value };
        if (shouldValidate) runValidate(nextValues);
        return nextValues;
      });
    },
    [runValidate, validateOnChange],
  );

  const handleChange = useCallback(
    (event) => {
      const { name } = event.target;
      const nextValue = getNextValue(event.target);
      setFieldValue(name, nextValue, { shouldValidate: validateOnChange });
    },
    [getNextValue, setFieldValue, validateOnChange],
  );

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validateOnBlur) runValidate(values);
    },
    [runValidate, validateOnBlur, values],
  );

  const resetForm = useCallback((nextInitialValues) => {
    const baseValues = nextInitialValues ?? initialValuesRef.current;

    setValues(baseValues);
    setErrors({});
    setSubmitCount(0);
    setTouched(() => {
      const nextTouched = {};
      for (const key of Object.keys(baseValues)) nextTouched[key] = false;
      return nextTouched;
    });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitCount((c) => c + 1);

      setTouched(makeAllTouched(values));
      const nextErrors = runValidate(values);
      if (Object.keys(nextErrors).length > 0) return;

      if (!onSubmit) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values, {
          resetForm,
          setErrors,
          setTouched,
          setValues,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, resetForm, runValidate, values],
  );

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const getFieldProps = useCallback(
    (name, { type } = {}) => {
      if (type === "checkbox") {
        return {
          name,
          checked: Boolean(values[name]),
          onChange: handleChange,
          onBlur: handleBlur,
          "aria-invalid": touched[name] && Boolean(errors[name]),
        };
      }

      return {
        name,
        value: values[name] ?? "",
        onChange: handleChange,
        onBlur: handleBlur,
        "aria-invalid": touched[name] && Boolean(errors[name]),
      };
    },
    [errors, handleBlur, handleChange, touched, values],
  );

  return {
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    submitCount,
    setValues,
    setTouched,
    setErrors,
    setFieldValue,
    getFieldProps,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validate: () => runValidate(values),
  };
}
