import React, { useEffect } from "react";
import { chatPuter, speakPuter } from "@/app/services/puter";
import { Languages, Loader, Volume2 } from "lucide-react";
import { translationPrompt } from "@/app/prompt/translation";
import languages from "@/app/prompt/languages.json";

export const Challenge = ({
  defaultLanguage,
  challenge,
}: {
  defaultLanguage: string;
  challenge: string;
}) => {
  const [showTranslation, setShowTranslation] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [chosenLanguage, setChosenLanguage] = React.useState<string | null>(
    null
  );
  // const [languages] = React.useState(require("@/app/prompt/languages.json"));
  const [translations, setTranslation] = React.useState<{
    [key: string]: string;
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (translations) {
      setIsLoading(false);
    }
  }, [translations, chosenLanguage]);

  console.log("Is loading translation: ", isLoading);
  return (
    <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
      <p className="text-white  font-semibold text-center leading-relaxed text-lg">
        {challenge}
      </p>
      <div className="flex items-center gap-2 justify-center mt-4 px-6">
        <Languages
          className={`curor-pointer ${
            showTranslation
              ? "text-blue-500 hover:text-blue-600 curor-pointer "
              : "text-gray-500 hover:text-white curor-pointer "
          }`}
          size={18}
          onClick={() => setShowTranslation(!showTranslation)}
        />
        <Volume2
          className="cursor-pointer text-gray-500 hover:text-white"
          size={18}
          onClick={async () => await speakPuter(challenge, chosenLanguage)}
        />
      </div>
      {showTranslation && (
        <>
          {/* translated challenge */}
          {translations !== null ? (
            <div className="border border-white/10 rounded-lg my-4 p-4 bg-black/30">
              {!isLoading ? (
                <p className="text-white/80 text-center leading-relaxed">
                  {translations &&
                    chosenLanguage &&
                    translations[chosenLanguage]}
                </p>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loading text="Translating..." />
                  ) : (
                    <p>Choose a language!</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loading
                  withIcon={false}
                  text="Choose a language..."
                  className="my-4"
                />
              ) : (
                <Loading text="Translating..." />
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 my-4">
            {languages
              .filter(
                ({ label }: { label: string }) =>
                  label.toLowerCase() !== defaultLanguage.toLowerCase()
              )
              .map(({ label, value }: { value: string; label: string }) => {
                if (value === defaultLanguage) return null;
                return (
                  <Translation
                    active={value === chosenLanguage ? true : false}
                    key={value}
                    language={label}
                    languageCode={value}
                    question={challenge}
                    setLoading={setIsLoading}
                    translation={(message, languageCode) => {
                      setChosenLanguage(value);
                      setTranslation({
                        ...translations,
                        [languageCode]: message,
                      });
                    }}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

const Loading = ({
  text,
  withIcon = true,
  className = "",
}: {
  text?: string;
  withIcon?: boolean;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {withIcon && (
        <Loader size={24} className="text-white animate-spin opacity-50" />
      )}
      <div className="text-white opacity-50 text-sm animate-pulse">{text}</div>
    </div>
  );
};

const Translation = ({
  active,
  language,
  question,
  translation,
  languageCode,
  setLoading,
}: {
  active: boolean;
  language: string;
  question?: string;
  translation?: (translation: string, language: string) => void;
  languageCode: string;
  setLoading?: (loading: boolean) => void;
}) => {
  async function onTranslate() {
    if (!question || !translation) return;
    console.log(`Translating to ${language}...`);
    if (setLoading) setLoading(true);
    const { ok, content: response } = await chatPuter(
      translationPrompt(question, language)
    );
    // const response = question;
    if (ok) {
      setTimeout(() => {
        if (setLoading) setLoading(false);
      }, 1000);
    }
    console.log("Translated Response: ", response);
    translation(response, languageCode);
  }
  const theme = !active
    ? "border-white/50 text-white/50 hover:border-white hover:text-white"
    : "border-blue-500 bg-blue-500 text-white";
  return (
    <div
      className={`border ${theme} rounded-full px-2 text-sm cursor-pointer`}
      onClick={onTranslate}
    >
      <p>{language}</p>
    </div>
  );
};
