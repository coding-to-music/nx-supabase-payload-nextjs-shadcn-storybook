export const cookieName = "i18next";
export const defaultNS = "translation";
export const fallbackLng = "en";
export const languages = [fallbackLng, "sv", "fi"];

export const getOptions = (
    lng: string = fallbackLng,
    ns: string | readonly string[] = defaultNS,
) => ({
    debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
});
