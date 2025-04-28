import FormHeader from "@/components/backoffice/FormHeader";
import NewSliderForm from "@/components/backoffice/Forms/NewSliderForm";
import { getData } from "@/lib/getData";

export default function NewSlider() {
  return (
    <div>
      <FormHeader title="New Banner" />
      <NewSliderForm/>
    </div>
  );
}
