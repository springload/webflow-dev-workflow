import React, { useState, useEffect } from "react";

const FormComponent = ({
  contactForm,
  careersForm,
}: {
  contactForm?: boolean;
  careersForm?: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    workplace: "",
    "email-address": "",
    phone: "",
    message: "",
    purpose: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    submitted: false,
    error: false,
  });

  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA
    const checkRecaptchaLoad = setInterval(() => {
      if (window["grecaptcha"] && window["grecaptcha"].render) {
        clearInterval(checkRecaptchaLoad);
        setRecaptchaLoaded(true);
      }
    }, 100);

    return () => clearInterval(checkRecaptchaLoad);
  }, []);

  useEffect(() => {
    window["submitContactForm"] = submitContactForm;

    return () => {
      delete window["submitContactForm"];
    };
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formStatus.loading) return;

    setFormStatus({ loading: true, submitted: false, error: false });

    if (
      recaptchaLoaded &&
      (window.location.hostname == "www.thelumery.com" ||
        window.location.hostname == "thelumery.com" ||
        window.location.hostname == "the-lumery-staging.webflow.io")
    ) {
      window["grecaptcha"].execute();
    } else {
      submitContactForm();
    }
  };

  const submitContactForm = async () => {
    const formApi = contactForm
      ? "https://tlmw-external.azurewebsites.net/api/WorkWithUsFromTrigger?code=QiLBHJW-xO1vMyjRdBPIiK9TLT034Mh6tZtPBrzmVGHMAzFusPcLbw=="
      : careersForm
      ? "https://tlmw-external.azurewebsites.net/api/WorkForUsFromTrigger?code=mCZ2_bPktS1K1qBQCw6BBOraSwoDu4uncxbe6nHRFg9LAzFuCEDigA=="
      : "";

    const recaptchaToken = window["grecaptcha"].getResponse();

    try {
      const response = await fetch(formApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "g-recaptcha-response": recaptchaToken,
        }),
      });

      if (response.ok) {
        setFormStatus({ loading: false, submitted: true, error: false });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error(error);
      setFormStatus({ loading: false, submitted: false, error: true });
    }
  };

  const formTitle = contactForm
    ? "Let's talk business"
    : careersForm
    ? "Let's talk now"
    : "Let's talk";

  return (
    <div className="form--work-with-us w-form">
      <form className="form" aria-label="Work with us" onSubmit={handleSubmit}>
        <div
          className="g-recaptcha"
          data-size="invisible"
          data-sitekey="6Lf4_sEUAAAAABsLO0JpoQS7cD_KsIdEv1AHyx96"
          data-callback="submitContactForm"
        ></div>
        <h2 className="lets-talk__heading">{formTitle}</h2>
        <div className="lets-talk__grid">
          <div className="text-field">
            <div className="form-label">
              <label htmlFor="lets-talk__name" className="label-text">
                What's your name?
              </label>
              <div aria-hidden="true" className="required">
                *
              </div>
            </div>
            <input
              className="form-input w-input"
              name="name"
              aria-describedby="lets-talk__name-hint"
              placeholder=""
              type="text"
              id="lets-talk__name"
              required
              onChange={handleChange}
            />
            <div id="lets-talk__name-hint" className="form-hint">
              Your full name
            </div>
          </div>
          <div className="text-field">
            <div className="form-label">
              <label htmlFor="lets-talk__work" className="label-text">
                Where do you work?
              </label>
              <div aria-hidden="true" className="required">
                *
              </div>
            </div>
            <input
              className="form-input w-input"
              name="workplace"
              aria-describedby="lets-talk_work-hint"
              placeholder=""
              type="text"
              id="lets-talk__work"
              required
              onChange={handleChange}
            />
            <div id="lets-talk_work-hint" className="form-hint">
              Company or organisation e.g. the Lumery
            </div>
          </div>
          <div className="email-field">
            <div className="form-label">
              <label htmlFor="lets-talk__email" className="label-text">
                Email address
              </label>
              <div aria-hidden="true" className="required">
                *
              </div>
            </div>
            <input
              className="form-input w-input"
              autoComplete="on"
              name="email-address"
              aria-describedby="lets-talk__email-hint"
              placeholder=""
              type="email"
              id="lets-talk__email"
              required
              onChange={handleChange}
            />
            <div id="lets-talk__email-hint" className="form-hint">
              e.g. susan@thelumery.com
            </div>
          </div>
          <div className="text-field">
            <div className="form-label">
              <label htmlFor="lets-talk__phone" className="label-text">
                Phone
              </label>
              <div aria-hidden="true" className="required">
                *
              </div>
            </div>
            <input
              className="form-input w-input"
              autoComplete="on"
              name="phone"
              aria-describedby="lets-talk__phone-hint"
              placeholder=""
              type="tel"
              id="lets-talk__phone"
              required
              onChange={handleChange}
            />
            <div id="lets-talk__phone-hint" className="form-hint">
              eg. 201 100 4857
            </div>
          </div>
        </div>
        <address
          aria-labelledby="what-brings-you-here"
          role="radiogroup"
          className="lets-talk__radios"
        >
          <label id="what-brings-you-here" htmlFor="" className="form-label">
            What brings you here today?
          </label>
          {contactForm && (
            <>
              <label className="radio-button w-radio">
                <input
                  id="i-need-your-help"
                  type="radio"
                  name="purpose"
                  className="w-form-formradioinput w-radio-input"
                  value="I need your help"
                  onChange={handleChange}
                />
                <label
                  htmlFor="i-need-your-help"
                  className="radio-button-label w-form-label"
                >
                  I need your help
                </label>
              </label>
              <label className="radio-button w-radio">
                <input
                  id="lets-talk_business-ready"
                  type="radio"
                  name="purpose"
                  className="w-form-formradioinput w-radio-input"
                  value="I want my business ready for tomorrow"
                  onChange={handleChange}
                />
                <label
                  htmlFor="lets-talk_business-ready"
                  className="radio-button-label w-form-label"
                >
                  I want my business ready for tomorrow
                </label>
              </label>
            </>
          )}
          {careersForm && (
            <>
              <label className="radio-button w-radio">
                <input
                  id="career-advice"
                  type="radio"
                  name="purpose"
                  className="w-form-formradioinput w-radio-input"
                  value="Career advice"
                  onChange={handleChange}
                />
                <label
                  htmlFor="career-advice"
                  className="radio-button-label w-form-label"
                >
                  Career advice
                </label>
              </label>
              <label className="radio-button w-radio">
                <input
                  id="i-want-to-be-a-lume"
                  type="radio"
                  name="purpose"
                  className="w-form-formradioinput w-radio-input"
                  value="I want to be a Lume"
                  onChange={handleChange}
                />
                <label
                  htmlFor="i-want-to-be-a-lume"
                  className="radio-button-label w-form-label"
                >
                  I want to be a Lume
                </label>
              </label>
            </>
          )}
          <label className="radio-button w-radio">
            <input
              id="media-and-marketing"
              type="radio"
              name="purpose"
              className="w-form-formradioinput w-radio-input"
              value="Media and marketing"
              onChange={handleChange}
            />
            <label
              htmlFor="media-and-marketing"
              className="radio-button-label w-form-label"
            >
              Media and marketing
            </label>
          </label>
          <label className="radio-button w-radio">
            <input
              id="Industry-and-partnerships"
              type="radio"
              name="purpose"
              className="w-form-formradioinput w-radio-input"
              value="Industry and partnerships"
              onChange={handleChange}
            />
            <label
              htmlFor="Industry-and-partnerships"
              className="radio-button-label w-form-label"
            >
              Industry and partnerships
            </label>
          </label>
          <label className="radio-button w-radio">
            <input
              id="other"
              type="radio"
              name="purpose"
              className="w-form-formradioinput w-radio-input"
              value="Other"
              onChange={handleChange}
            />
            <label htmlFor="other" className="radio-button-label w-form-label">
              Other
            </label>
          </label>
        </address>
        <div className="text-field">
          <div className="form-label">
            <label htmlFor="lets-talk__message" className="label-text">
              How can we help you?
            </label>
          </div>
          <textarea
            className="form-input w-input"
            name="message"
            aria-describedby="lets-talk__message-hint"
            placeholder=""
            id="lets-talk__message"
            onChange={handleChange}
          ></textarea>
          <div id="lets-talk__message-hint" className="form-hint">
            Your message
          </div>
        </div>
        <div className="submit-container">
          <input
            type="submit"
            id="w-node-_11da1ed0-b7b8-16c6-20be-09918134b533-f9a95c4c"
            className="button button--submit w-button"
            value="Submit"
          />
          <div
            id="w-node-_11da1ed0-b7b8-16c6-20be-09918134b534-f9a95c4c"
            className="fake-button-container"
          >
            <div aria-hidden="true" className="fake-button btn">
              <div
                id="w-node-_83373c2e-5001-461c-cb58-342665ef556c-65ef556b"
                className="btn__bg btn__bg--primary"
              ></div>
              <div
                id="w-node-_83373c2e-5001-461c-cb58-342665ef556d-65ef556b"
                className="btn__text btn__text--primary"
              >
                {formStatus.loading ? "Please wait..." : "Submit"}
              </div>
            </div>
          </div>
        </div>
      </form>
      {formStatus.submitted && (
        <div
          className="success-message w-form-done"
          role="region"
          aria-label="Work with us success"
        >
          <div className="text-block-4">
            Thank you! Your submission has been received!
          </div>
        </div>
      )}
      {formStatus.error && (
        <div
          className="w-form-fail"
          role="region"
          aria-label="Work with us failure"
        >
          <div className="text-block-3">
            Oops! Something went wrong while submitting the form.
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
