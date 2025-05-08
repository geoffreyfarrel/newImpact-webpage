import { useTranslations } from "next-intl";

const useModelNames = () => {
  return [
    {
      key: "ensemble",
      label: "ensemble",
    },
    {
      key: "gru",
      label: "gru",
    },
    {
      key: "lstm",
      label: "lstm",
    },
    {
      key: "cnn_gru",
      label: "cnn_gru",
    },
    {
      key: "cnn_lstm",
      label: "cnn_lstm",
    },
    {
      key: "transformer",
      label: "transformer",
    },
  ];
};

export { useModelNames };
