<script setup>
import axios from "axios";
import { defineProps, ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import "vue3-toastify/dist/index.css";
import html2pdf from "html2pdf.js";

const props = defineProps({
  details: Object,
  closeModalRecuTransaction: Function,
});

const table = ref(null);
// const getOrigineFonds = (id) => {
//   switch (id) {
//     case 1:
//       return "Salaire";
//     case 2:
//       return "Economie";
//     case 3:
//       return "Cadeau";
//     case 4:
//       return "Autre";
//   }
// };

// const getQrcode = async (id) => {
//   try {
//     const response = await axios.post("/backoffice/rechargement/qr/" + id);
//     if (response.data.status === "success") {
//       const qrCodeImage = response.data.qrCode;
//       document.getElementById(
//         "qrCodeContainer"
//       ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
//     } else {
//       console.error(response.data.message);
//     }
//   } catch (error) {
//     console.error("An error occurred while generating the QR code:", error);
//   }
// };

onMounted(() => {
  //   getOrigineFonds();
  //   getQrcode(props.details.id);
});

const exportPDF = async () => {
  const tableWidth = table.value.clientWidth;
  const tableHeight = table.value.clientHeight;

  let filename = new Date();

  const options = {
    filename:
      "recu-transactions-momo-" +
      props.details.senderCarte?.carteNumber +
      `${filename}` +
      ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 10, // Increase scale to improve image quality
      useCORS: true, // Enable cross-origin resource sharing
      logging: true, // Enable logging for troubleshooting
    },
    jsPDF: {
      unit: "pt",
      format: [tableWidth, tableHeight],
      orientation: "portrait",
    },
    margin: [20, 30, 0, 30],
  };

  // Call html2pdf function with options
  html2pdf().from(table.value).set(options).save();
};
</script>

<template>
  <!-- Create Modal-->
  <Dialog
    modal
    header="Reçu de Transaction"
    position="top"
    :closable="false"
    :style="{ width: '50vw' }"
    maximizable
  >
    <div class="container mt-4">
      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="flex flex-col xs:w-[375px] sm:w-[350px] md:w-[400px] lg:w-[500px] w-[230px]"
        >
          <div
            class="xs:w-[375px] sm:w-[300px] md:w-[350px] lg:w-[450px] w-[180px] bg-[#F9F9F9] rounded-[20px]"
          >
            <div
              class="px-[2rem] h-full w-full flex flex-col justify-center items-center"
            >
              <div
                class="px-[2rem] w-full h-full flex flex-col justify-center items-center"
                ref="table"
              >
                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Trait de séparation -->
                <!-- ******************* -->
                <!-- ******************* -->
                <div
                  class="w-full border-b-2 border-black border-dashed relative"
                ></div>
                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Trait de séparation -->
                <!-- ******************* -->
                <!-- ******************* -->

                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Date de transaction -->
                <!-- ******************* -->
                <!-- ******************* -->
                <div class="py-3 flex flex-col items-center justify-center">
                  <span class="text-lg font-semibold">
                    REÇU DE TRANSACTION
                  </span>

                  <span class="text-[#6c757d] text-sm font-medium">
                    {{
                      new Date(props.details?.crea).toLocaleString(
                        "fr-FR",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }
                      )
                    }}
                  </span>
                </div>
                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Date de transaction -->
                <!-- ******************* -->
                <!-- ******************* -->

                <!-- ******************** -->
                <!-- ******************** -->
                <!-- Informations du reçu -->
                <!-- ******************** -->
                <!-- ******************** -->
                <div class="justify-start w-full my-3">
                  <!-- ************ -->
                  <!-- ************ -->
                  <!-- Montant envoyé -->
                  <!-- ************ -->
                  <!-- ************ -->
                  <div class="flex flex-row gap-2 items-center mb-2">
                    <div class="flex flex-col">
                      <span class="text-[#6c757d] font-medium text-sm">
                        Montant 
                      </span>
                      <span class="font-semibold text-black text-[1.5rem]">
                        {{
                          new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                          }).format(props.details?.total_amount)
                        }}
                      </span>
                    </div>
                    <!-- ************ -->
                    <!-- ************ -->
                    <!-- Montant envoyé -->
                    <!-- ************ -->
                    <!-- ************ -->

                    <!-- ************************* -->
                    <!-- ************************* -->
                    <div class="relative left-10">
                      <!-- <img src="/Tampons-Apaym.png" alt="Tampon paiement reussi" width="200"> -->
                    </div>
                    <!-- ************************* -->
                    <!-- ************************* -->
                    <!-- Tampon de paiement réussi -->
                    <!-- ************************* -->
                    <!-- ************************* -->
                  </div>


                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Identifiant de la CARTE -->
                  <!-- ***************** -->
                  <!-- ***************** -->

                  <div class="flex flex-row gap-2 items-center mb-2">
                    <div class="flex flex-col">
                      <span class="text-[#6c757d] font-medium text-sm">
                        Statut
                      </span>
                      <span class="font-semibold text-black text-sm">
                        {{ props.details.is_valided ? "Validé" : 'Non Validé' }}
                      </span>
                    </div>
                  </div>

                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Identifiant de la CARTE -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- <div class="flex flex-col items-start mb-2">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Identifiant de la carte
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ props.details?.carte.carteNumber }}
                    </span>
                  </div> -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Identifiant de la CARTE -->
                  <!-- ***************** -->
                  <!-- ***************** -->

                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Type de service -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- <div class="flex flex-col items-start mb-2">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Type de service
                    </span>
                    <span class="font-semibold text-black text-lg">
                      Rechargement
                    </span>
                  </div> -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Type de service -->
                  <!-- ***************** -->
                  <!-- ***************** -->

                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Mode de paiement -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- <div class="flex flex-col items-start mb-2">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Mode de paiement
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ props.details?.mode_paiement.designation }}
                    </span>
                  </div> -->
                  <!-- ***************** -->
                  <!-- ***************** -->
                  <!-- Mode de paiement -->
                  <!-- ***************** -->
                  <!-- ***************** -->

                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Deposant-->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- <div class="flex flex-col items-start mb-3">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Déposant
                    </span>
                    <span class="font-semibold text-black text-sm">
                      {{ props.details?.deposant.nomPrenom }}
                    </span>
                  </div>

                  <div class="flex flex-col items-start mb-3">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Contact déposant
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ props.details?.deposant.contact }}
                    </span>
                  </div> -->

                  <!-- <div class="flex flex-col items-start mb-3">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Pièce déposant
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ props.details?.deposant.numeroPiece }}
                    </span>
                  </div> -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Deposant-->
                  <!-- ********************* -->
                  <!-- ********************* -->

                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Origine des fonds -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- <div class="flex flex-col items-start mb-3">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Origine des fonds
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ getOrigineFonds(props.details?.origineFond) }}
                    </span>
                  </div> -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Origine des fonds -->
                  <!-- ********************* -->
                  <!-- ********************* -->

                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Agence -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- <div class="flex flex-col items-start mb-3">
                    <span class="text-[#6c757d] font-medium text-sm">
                      Agence
                    </span>
                    <span class="font-semibold text-black text-lg">
                      {{ props.details?.agence.libelle }}
                    </span>
                  </div> -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Agence -->
                  <!-- ********************* -->
                  <!-- ********************* -->

                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Caissière -->
                  <!-- ********************* -->
                  <!-- ********************* -->

                  <!-- ********************* -->
                  <!-- ********************* -->
                  <!-- Caissière -->
                  <!-- ********************* -->
                  <!-- ********************* -->
                </div>
                <!-- ******************** -->
                <!-- ******************** -->
                <!-- Informations du reçu -->
                <!-- ******************** -->
                <!-- ******************** -->

                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Trait de séparation -->
                <!-- ******************* -->
                <!-- ******************* -->
                <div
                  class="w-full border-b-2 border-black border-dashed relative"
                ></div>
                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Trait de séparation -->
                <!-- ******************* -->
                <!-- ******************* -->

                <!-- ***** -->
                <!-- ***** -->
                <!-- Merci -->
                <!-- ***** -->
                <!-- ***** -->
                <div
                  class="text-1xl flex flex-col items-center font-semibold py-3"
                >
                  MERCI
                </div>
                <!-- ***** -->
                <!-- ***** -->
                <!-- Merci -->
                <!-- ***** -->
                <!-- ***** -->

                <!-- ******************* -->
                <!-- ******************* -->
                <!-- Trait de séparation -->
                <div
                  class="w-full border-b-2 border-black border-dashed relative"
                ></div>
                <!-- Trait de séparation -->
                <!-- ******************* -->
                <!-- ******************* -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <Button
          label="Fermer"
          icon="pi pi-times"
          @click="props.closeModalRecuRechargement()"
          text
          class="btn btn-outline-secondary waves-effect"
          style="color: #6d788d"
        />

        <button
          style="text-transform: none; height: 39px"
          class="btn btn-warning waves-effect waves-light"
          @click="exportPDF()"
        >
          <i class="pi pi-check"></i> Télécharger le pdf
        </button>
      </div>
    </div>
  </Dialog>
  <!-- Create Modal-->
</template>

<style scoped>
.input--error {
  border-color: red;
}
</style>
