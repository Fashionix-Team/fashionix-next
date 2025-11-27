export const ResetPasswordMutation = /* GraphQL */ `
  mutation ResetPassword(
    $email: String!
    $token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    resetPassword(
      input: {
        email: $email
        token: $token
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status # Menunjukkan sukses (true) atau gagal (false)
      message # Pesan status yang relevan
    }
  }
`;