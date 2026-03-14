"use server";

import { createLead, ProspectData } from "@/lib/airtable";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "NOM requis"),
  company: z.string().min(1, "Nom entreprise requis"),
  email: z.string().email("Email invalide"),
  categorie: z.array(z.string()).min(1, "Sélectionnez au moins un intérêt"),
  message: z.string().min(1, "Message requis"),
});

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      categorie: formData.getAll("categorie") as string[],
      message: formData.get("message") as string,
    };

    const validatedData = contactSchema.parse(rawData);

    await createLead({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      company: validatedData.company,
      categorie: validatedData.categorie,
      message: validatedData.message,
      source: "Forms",
    });

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: "Une erreur est survenue lors de l'envoi." };
  }
}
