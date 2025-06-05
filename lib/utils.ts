import { ReadonlyURLSearchParams } from "next/navigation";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "WOOCOMMERCE_URL",
    "WOOCOMMERCE_CONSUMER_KEY",
    "WOOCOMMERCE_CONSUMER_SECRET",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them.\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }
};

export const getEnvVar = (key: string): string => {
  const value = process.env[key];

  // Fallback values if environment variables are not defined
  if (!value) {
    const fallbacks: Record<string, string> = {
      WOOCOMMERCE_URL: "https://klassyandfab.co",
      WOOCOMMERCE_CONSUMER_KEY: "ck_666c114d7bfbb16e87fb3957abe5262bc71d6fe5",
      WOOCOMMERCE_CONSUMER_SECRET:
        "cs_11a59025525782a5deb710dc225e68ddebd84648",
      WOOCOMMERCE_REVALIDATION_SECRET: "your-revalidation-secret",
      COMPANY_NAME: "Modest Wear Co.",
      SITE_NAME: "K&F",
    };

    if (fallbacks[key]) {
      console.warn(`Using fallback for environment variable ${key}`);
      return fallbacks[key];
    }

    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};
