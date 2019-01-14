export interface WidgetThemeProps {
  btnBorderRadius: string;
  btnPrimaryBackgroundColor: string;
  btnPrimaryColor: string;
  hotspotButtonColor: string;
  closeButtonColor: string;
  closeButtonBackgroundColor: string;
  headerBackgroundColor1: string;
  headerBackgroundColor2: string;
  headerTextColor: string;
  linkColor: string;
  mainTextColor: string;
  userSaysTextColor: string;
  userSaysBackgroundColor: string;
  botSaysTextColor: string;
  botSaysBackgroundColor: string;
  messageSendBtnColor: string;
  outline: string;
}

export const theme: WidgetThemeProps = {
  btnBorderRadius: "100px",
  btnPrimaryBackgroundColor: "#4facfe",
  btnPrimaryColor: "#4c4c4c",
  hotspotButtonColor: "#000",
  closeButtonColor: "rgba(0, 0, 0, 0.4)",
  closeButtonBackgroundColor: "rgba(255, 255, 255, 0.9)",
  headerBackgroundColor1: "#4facfe",
  headerBackgroundColor2: "#00f2fe",
  headerTextColor: "#fff",
  linkColor: "#4c4c4c",
  mainTextColor: "#4c4c4c",
  userSaysTextColor: "#fff",
  userSaysBackgroundColor: "#4facfe",
  botSaysTextColor: "#4C4C4C",
  botSaysBackgroundColor: "#F2F2F2",
  messageSendBtnColor: "#9a9a9a",
  outline: "2px dashed #d8d8d8",
};
