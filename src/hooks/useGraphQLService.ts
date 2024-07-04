// Fix errors threatment

import { DocumentNode, useMutation, useQuery, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { JWTCookie } from '../config/app/CookiesConfig';
import GraphQLOptionsConfig from '../config/app/GraphQLOptionsConfig';
import ERROR_MSGS from '../config/constants/ERROR_MSGS';
import { IGQLResponses } from '../interfaces/IGQLResponses';
import CookiesService from '../services/CookiesService';

interface IGQL {
  query: { gql: DocumentNode; loginRequired: boolean };
  mutation: { gql: DocumentNode; loginRequired: boolean };
  subscription: { gql: DocumentNode; loginRequired: boolean };
}

function gqlQuery<DataType, GQLType extends string>({ gql, loginRequired }: IGQL['query']) {
  const token = CookiesService.get(JWTCookie.key);

  const { data, error, refetch } = useQuery(gql, {
    context: GraphQLOptionsConfig(token).context,
    skip: loginRequired && !token,
  });

  if (loginRequired && !token) {
    return null;
  }

  return {
    data: data as {
      [key in GQLType]: IGQLResponses<DataType>;
    },
    refetch,
    error,
  };
}

function gqlMutation({ gql, loginRequired }: IGQL['mutation']) {
  try {
    const token = CookiesService.get(JWTCookie.key);

    const [mutate] = useMutation(gql);
    const mutationFn = async (payload: any) => {
      return await mutate({
        context: GraphQLOptionsConfig(token).context,
        variables: { payload: payload },
      });
    };

    if (loginRequired && !token) {
      return null;
    }

    return mutationFn;
  } catch (err: any) {
    toast.error(ERROR_MSGS.SERVER_OFFLINE_MSG);
  }
}

let errorMessageAlreadyDisplayed = false;
function gqlSubscription<DataType, GQLType extends string>({ gql, loginRequired }: IGQL['subscription']) {
  try {
    const token = CookiesService.get(JWTCookie.key);

    const { data, error } = useSubscription(gql, {
      context: GraphQLOptionsConfig(token).context,
      skip: loginRequired && !token,
    });

    if (loginRequired && !token) {
      return null;
    }

    if (error) throw new Error(error.message);

    return {
      data: data as {
        [key in GQLType]: IGQLResponses<DataType>;
      },
    };
  } catch (err: any) {
    if (!errorMessageAlreadyDisplayed) {
      toast.error(err);
      errorMessageAlreadyDisplayed = true;
    }
    return { data: undefined };
  }
}

export { gqlMutation, gqlQuery, gqlSubscription };
