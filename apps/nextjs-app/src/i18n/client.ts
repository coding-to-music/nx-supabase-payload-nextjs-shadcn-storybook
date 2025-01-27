"use client";

import {canUseDom} from "@my-project/utils";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import React from "react";
import {useCookies} from "react-cookie";
import {initReactI18next, useTranslation} from "react-i18next";

import {cookieName, getOptions, languages} from "./options";

void i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`),
        ),
    )
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ["htmlTag", "cookie", "navigator"],
        },
        preload: canUseDom ? [] : languages,
    });

export const InitI18nClient = ({lng}: {lng: string}) => {
    const {i18n} = useTranslation();
    if (!canUseDom && i18n.resolvedLanguage !== lng) {
        console.log("InitI18nClient changing language in render scope", {
            canUseDom,
            i18nResolvedLanguage: i18n.resolvedLanguage,
            lng,
        });
        void i18n.changeLanguage(lng);
    }
    const [activeLng, setActiveLng] = React.useState(i18n.resolvedLanguage);
    React.useEffect(() => {
        console.log("InitI18nClient useEffect 1", {canUseDom});
        if (activeLng === i18n.resolvedLanguage) {
            return;
        }
        console.log("InitI18nClient setting active language", {
            canUseDom,
            activeLng,
            i18nResolvedLanguage: i18n.resolvedLanguage,
        });
        setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    React.useEffect(() => {
        console.log("InitI18nClient useEffect 2", {canUseDom});
        if (i18n.resolvedLanguage === lng) {
            return;
        }
        console.log("InitI18nClient changing language in useEffect scope", {
            canUseDom,
            i18nResolvedLanguage: i18n.resolvedLanguage,
            lng,
        });
        void i18n.changeLanguage(lng);
    }, [lng, i18n]);
    const [cookies, setCookie] = useCookies([cookieName]);
    const cookie: unknown = cookies[cookieName];
    React.useEffect(() => {
        console.log("InitI18nClient useEffect 3", {canUseDom});
        if (cookie === lng) {
            return;
        }
        console.log(`InitI18nClient setting cookie "${cookieName}"`, {
            canUseDom,
            cookie,
            lng,
        });
        setCookie(cookieName, lng, {path: "/"});
    }, [lng, cookie, setCookie]);
    return null;
};
