"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { waLink } from "@/lib/whatsapp";

type ContactFormProps = {
  /** Nombres de las experiencias, pasados por la página (datos del negocio). */
  experienceOptions: string[];
  /** Opciones adicionales del negocio (p. ej. "Plan a la medida"). */
  extraOptions?: string[];
};

type FormValues = {
  nombre: string;
  contacto: string;
  fecha: string;
  participantes: string;
  experiencia: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  nombre: "",
  contacto: "",
  fecha: "",
  participantes: "",
  experiencia: "",
  mensaje: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.nombre.trim().length < 2) {
    errors.nombre = "Escribe tu nombre (mínimo 2 caracteres).";
  }
  if (values.contacto.trim().length < 5) {
    errors.contacto =
      "Escribe cómo podemos contactarte (WhatsApp, correo o Instagram).";
  }
  const participantes = Number(values.participantes);
  if (
    values.participantes.trim() === "" ||
    !Number.isInteger(participantes) ||
    participantes < 1
  ) {
    errors.participantes =
      "Indica un número de participantes igual o mayor a 1.";
  }
  return errors;
}

function buildMessage(values: FormValues): string {
  const lines = [
    "Hola DeAventura 👋 Quiero solicitar una cotización para una salida privada.",
    "",
    `Nombre: ${values.nombre.trim()}`,
    `Forma de contacto: ${values.contacto.trim()}`,
  ];
  if (values.fecha.trim()) {
    lines.push(`Fecha aproximada: ${values.fecha.trim()}`);
  }
  lines.push(`Participantes: ${values.participantes.trim()}`);
  if (values.experiencia) {
    lines.push(`Tipo de experiencia: ${values.experiencia}`);
  }
  if (values.mensaje.trim()) {
    lines.push("", `Mensaje: ${values.mensaje.trim()}`);
  }
  return lines.join("\n");
}

const FIELD_CLASSES =
  "w-full rounded-lg border-2 border-arena-200 bg-white px-4 py-3 text-tinta transition-colors focus:border-bosque-500 focus:outline-none";

const LABEL_CLASSES = "block text-sm font-semibold text-bosque-900";

function fieldClass(hasError: boolean): string {
  return `${FIELD_CLASSES} ${hasError ? "border-tierra-600" : ""}`;
}

/**
 * Formulario de solicitud de cotización.
 *
 * No hay backend: al enviar se abre WhatsApp con el mensaje ya compuesto
 * (`wa.me`). No se simula ningún envío ni se guarda ningún dato en el sitio.
 */
export default function ContactForm({
  experienceOptions,
  extraOptions = [],
}: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`campo-${firstInvalid}`)?.focus();
      return;
    }

    const url = waLink(buildMessage(values));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (sentUrl) {
    return (
      <div
        role="region"
        aria-label="Solicitud preparada"
        className="rounded-card border-bosque-500 bg-bosque-50 border-2 p-6 sm:p-8"
      >
        <h3 className="font-display text-bosque-900 text-2xl font-semibold">
          Tu solicitud está lista en WhatsApp
        </h3>
        <p className="text-tinta-suave mt-3 leading-relaxed">
          Si la pestaña de WhatsApp no se abrió automáticamente, usa el enlace
          de abajo. Revisa el mensaje que preparamos con tus datos y presiona
          enviar. Este sitio no guarda tu información: la solicitud viaja
          directamente por WhatsApp hacia nuestro equipo.
        </p>
        <p className="mt-4">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
          >
            ¿No se abrió WhatsApp? Volver a abrir el mensaje
          </a>
        </p>
        <button
          type="button"
          onClick={() => {
            setSentUrl(null);
            setValues(EMPTY_VALUES);
          }}
          className="border-bosque-700 text-bosque-800 hover:bg-bosque-50 mt-6 inline-flex rounded-full border-2 px-5 py-2.5 font-semibold transition-colors"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <p role="status" className="sr-only">
        {sentUrl
          ? "Preparamos tu solicitud en WhatsApp. Si la pestaña no se abrió, usa el enlace de la página."
          : ""}
      </p>
      <p className="text-tinta-suave text-sm leading-relaxed">
        Completa estos datos y al enviar se abrirá WhatsApp con tu solicitud
        lista para enviar. Campos con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> obligatorios.
      </p>

      <div>
        <label htmlFor="campo-nombre" className={LABEL_CLASSES}>
          Nombre <span aria-hidden="true">*</span>
        </label>
        <input
          id="campo-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          required
          value={values.nombre}
          onChange={(event) => update("nombre", event.target.value)}
          aria-invalid={errors.nombre ? true : undefined}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          className={`mt-2 ${fieldClass(Boolean(errors.nombre))}`}
        />
        {errors.nombre ? (
          <p
            id="error-nombre"
            role="alert"
            className="text-tierra-700 mt-2 text-sm"
          >
            {errors.nombre}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="campo-contacto" className={LABEL_CLASSES}>
          Forma de contacto <span aria-hidden="true">*</span>
        </label>
        <input
          id="campo-contacto"
          name="contacto"
          type="text"
          autoComplete="tel"
          placeholder="Tu WhatsApp, correo o Instagram"
          required
          value={values.contacto}
          onChange={(event) => update("contacto", event.target.value)}
          aria-invalid={errors.contacto ? true : undefined}
          aria-describedby={errors.contacto ? "error-contacto" : undefined}
          className={`mt-2 ${fieldClass(Boolean(errors.contacto))}`}
        />
        {errors.contacto ? (
          <p
            id="error-contacto"
            role="alert"
            className="text-tierra-700 mt-2 text-sm"
          >
            {errors.contacto}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="campo-fecha" className={LABEL_CLASSES}>
            Fecha aproximada
          </label>
          <input
            id="campo-fecha"
            name="fecha"
            type="text"
            placeholder="Ej. sábado 8 de noviembre"
            value={values.fecha}
            onChange={(event) => update("fecha", event.target.value)}
            className={`mt-2 ${FIELD_CLASSES}`}
          />
        </div>

        <div>
          <label htmlFor="campo-participantes" className={LABEL_CLASSES}>
            Número de participantes <span aria-hidden="true">*</span>
          </label>
          <input
            id="campo-participantes"
            name="participantes"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            required
            value={values.participantes}
            onChange={(event) => update("participantes", event.target.value)}
            aria-invalid={errors.participantes ? true : undefined}
            aria-describedby={
              errors.participantes ? "error-participantes" : undefined
            }
            className={`mt-2 ${fieldClass(Boolean(errors.participantes))}`}
          />
          {errors.participantes ? (
            <p
              id="error-participantes"
              role="alert"
              className="text-tierra-700 mt-2 text-sm"
            >
              {errors.participantes}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="campo-experiencia" className={LABEL_CLASSES}>
          Tipo de experiencia
        </label>
        <select
          id="campo-experiencia"
          name="experiencia"
          value={values.experiencia}
          onChange={(event) => update("experiencia", event.target.value)}
          className={`mt-2 ${FIELD_CLASSES}`}
        >
          <option value="">Aún no lo sé, ayúdenme a elegir</option>
          {experienceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          {extraOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="campo-mensaje" className={LABEL_CLASSES}>
          Mensaje adicional (opcional)
        </label>
        <textarea
          id="campo-mensaje"
          name="mensaje"
          rows={4}
          placeholder="Cuéntanos qué esperan de la salida, restricciones de horario, si hay principiantes, niños o personas mayores…"
          value={values.mensaje}
          onChange={(event) => update("mensaje", event.target.value)}
          className={`mt-2 ${FIELD_CLASSES}`}
        />
      </div>

      <p className="text-tinta-suave text-sm leading-relaxed">
        Al continuar se abrirá WhatsApp; tus datos no se almacenan en este
        sitio. Consulta nuestra{" "}
        <Link
          href="/politica-de-privacidad"
          className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
        >
          política de privacidad
        </Link>
        .
      </p>

      <div>
        <button
          type="submit"
          className="bg-whatsapp hover:bg-whatsapp-oscuro inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-colors"
        >
          <WhatsAppIcon />
          Preparar solicitud en WhatsApp
        </button>
      </div>
    </form>
  );
}
