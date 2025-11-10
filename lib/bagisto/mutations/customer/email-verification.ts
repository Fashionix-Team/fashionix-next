import { gql } from "graphql-request";

/**
 * Mutation untuk memverifikasi akun customer menggunakan token.
 * * Variabel:
 * - $token: String! (Token verifikasi yang diterima dari URL)
 */
export const CustomerEmailVerification = gql`
    mutation verifyCustomerAccount($token: String!) {
        verifyCustomerAccount(token: $token) {
            status
            message
            customer {
                id
                email
                is_verified
                name
            }
        }
    }
`;