import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const Provider = ({ children, ...others }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient} {...others}>
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
