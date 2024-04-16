const GraphQLOptionsConfig = (token: string | undefined) => {
  return {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

export default GraphQLOptionsConfig;
