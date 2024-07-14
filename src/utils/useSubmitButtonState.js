import { computed } from "vue";

export default function useSubmitButtonState(user) {
  const isSubmitButtonDisabled = computed(() => {
    let disabled = true;
    for (let prop in user) {
      if (!user[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isSubmitButtonDisabled };
}
