export function SignUpRepository(FormValues, id) {
  return {
    _id: id,
    firstName: FormValues.firstName,
    lastName: FormValues.lastName,

    mobile: FormValues.mobile,
    dateOfBirth: Date.parse(FormValues.dateOfBirth),

    password: FormValues.password,
  };
}
