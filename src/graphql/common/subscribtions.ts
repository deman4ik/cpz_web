import gql from "graphql-tag";

/**
 *  Получение сообщений для чата с тех поддержкой
 *  @user_id -  id  по которому отибираются from/to сообщения
 *  Использование: manage/support/(user_id)  |  /support
 */
export const GET_SUPPORT_MESSAGES = gql`
    query get_support_messages($user_id: uuid) {
        messages(
            where: {
                _or: [{ to: { _eq: $user_id } }, { _and: [{ from: { _eq: $user_id } }, { to: { _is_null: true } }] }]
            }
            order_by: { timestamp: asc }
        ) {
            data
            from
            to
            timestamp
        }
    }
`;
