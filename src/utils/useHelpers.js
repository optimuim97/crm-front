import dayjs from "dayjs";

export default function useHelpers() {
  //Formatage de nombre
  const formatNumber = (value, decimals = 2, thousandsSeparator = ",") => {
    let result = parseFloat(value).toFixed(decimals).toString();
    if (thousandsSeparator)
      result = result.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    return result;
  };

  // Formatage de DATE
  const formatDate = (dateString, format) => {
    const date = dayjs(dateString);
    // Then specify how you want your dates to be formatted
    return date.format(format);
  };

  // Mettre première lettre en Majuscule
  const first2UpperCase = (texte) => {
    let t = new Array();
    let j = 0;
    for (j; j < texte.length; j++) {
      if (j == 0) t[j] = texte.substr(j, 1).toUpperCase();
      else t[j] = texte.substr(j, 1).toLowerCase();
    }
    return t.join("");
  };

  //Calcule age
  function calculateAge(y, m, d) {
    // birthday year, month, day
    var birthday = new Date(y + "-" + m + "-" + d);
    console.log(birthday, y, m, d);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function getOperationName(operation) {
    switch (operation) {
      case "Transfert Carte vers Orange":
        return "Transfert vers Orange";
      case "Transfert Carte vers Wave":
        return "Transfert vers Wave";
      case "Transfert Carte vers Moov":
        return "Transfert vers Moov";
      case "Transfert Carte vers MTN":
        return "Transfert vers MTN";
      case "Rechargement Carte par Orange":
        return "Rechargement par Orange";
      case "Rechargement Carte par Wave":
        return "Rechargement par Wave";
      case "Rechargement Carte par MTN":
        return "Rechargement par MTN";
      case "Rechargement Carte par Moov":
        return "Rechargement par Moov";
      case "Transfert Carte vers Tresorpay":
        return "Transfert vers Tresorpay";
      case "Transfert carte vers carte identique":
        return "Transfert vers Carte Identique";
      case "Transfert carte vers carte differente":
        return "Transfert vers carte Differente";
      case "Transfert carte vers compte bancaire":
        return "Transfert vers compte bancaire";
      case "Transfert carte vers espece":
        return "Transfert vers Espèce";
      case "Transfert carte vers mobile money international":
        return "Transfert vers Mobile Money International";
      case "Rechargement carte par coupon":
        return "Rechargement par Coupon";
      case "Rechargement carte par cinetpay":
        return "Rechargement par Cinetpay";
      case "Achat ticket par carte":
        return "Achat de Ticket";
      case "Rechargement a la caisse":
        return "Rechargement a la caisse";
      case "Approvisionnement de coffre":
        return "Approvisionnement de coffre";
      case "Achat credit téléphonique par carte":
        return "Achat credit téléphonique par carte";
      default:
        return null;
    }
  }

  return {
    formatNumber,
    formatDate,
    first2UpperCase,
    calculateAge,
    getOperationName,
  };
}
