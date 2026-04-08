/**
 * Single doctor identity constants.
 *
 * To support multiple doctors in the future:
 *   - Convert this to a database table or config file.
 *   - Fetch by doctor ID rather than importing directly.
 *   - Pass doctor object as a prop/param throughout the app.
 */

export const DOCTOR = {
  name:           'Dr. Reynaldo O. Joson',
  clinic:         'Manila Doctors Hospital',
  address:        'Suite 301, Medical Arts Center, U.N. Avenue Ermita, Manila',
  phone:          '+63 2 524-30-11',
  registrationNo: 'PRC Reg. No. XXXXX',
  avatarUrl:      '/doctor-avatar.png',
};
