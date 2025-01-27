import acceptLanguage from "accept-language";
import {createInstance} from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import {cookies as cookies_, headers as headers_} from "next/headers";
import {initReactI18next} from "react-i18next/initReactI18next";

import {cookieName, fallbackLng, getOptions} from "./options";

const initI18next = async (lng: string, ns: string | readonly string[]) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                // eslint-disable-next-line @typescript-eslint/promise-function-async
                (language: string, namespace: string) =>
                    import(`./locales/${language}/${namespace}.json`),
            ),
        )
        .init(getOptions(lng, ns));
    return i18nInstance;
};

export const useTranslation = async (
    lng: string,
    ns: string | readonly string[],
    options: {keyPrefix?: string} = {},
) => {
    const i18nextInstance = await initI18next(lng, ns);
    return {
        t: i18nextInstance.getFixedT(
            lng,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            Array.isArray(ns) ? ns[0] : ns,
            options.keyPrefix,
        ),
        i18n: i18nextInstance,
    };
};

export const language = async () => {
    const cookies = await cookies_();
    const headers = await headers_();
    let lng;
    if (cookies.has(cookieName))
        lng = acceptLanguage.get(cookies.get(cookieName)!.value);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!lng) lng = acceptLanguage.get(headers.get("Accept-Language"));
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!lng) lng = fallbackLng;
    return lng;
};
