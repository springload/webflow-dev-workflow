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
  }, []);

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
        window.location.hostname == "thelumery.com")
    ) {
      window["grecaptcha"].execute();
    } else {
      submitContactForm();
    }
  };

  const submitContactForm = async () => {
    try {
      const response = await fetch(
        "https://thelumerymiddlewarefunctionsexternal.azurewebsites.net/api/ContactPost?code=6Ncw7Eg4rubP4tDnaSsaXgDpuA3ffxdRyVbj5Jk2JIdkOZ/EPfYhGA==",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

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

  return (
    <div className="form--work-with-us w-form">
      <form
        id="wf-form-Work-with-us"
        name="wf-form-Work-with-us"
        data-name="Work with us"
        className="form"
        aria-label="Work with us"
        onSubmit={handleSubmit}
      >
        <div
          className="g-recaptcha"
          data-size="invisible"
          data-sitekey="6Lf4_sEUAAAAABsLO0JpoQS7cD_KsIdEv1AHyx96"
          data-callback="submitContactForm"
        ></div>
        <h2 className="lets-talk__heading">Let's talk business</h2>
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
              data-name="Name"
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
              data-name="Workplace"
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
              data-name="Email address"
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
              data-name="Phone"
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
                  data-name="Purpose"
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
                  data-name="Purpose"
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
                  data-name="Purpose"
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
                  data-name="Purpose"
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
              data-name="Purpose"
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
              data-name="Purpose"
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
              data-name="Purpose"
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
            data-name="Message"
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
            data-wait="Please wait..."
            className="button button--submit screenreader-only w-button"
            value="Submit"
          />
          <div className="fake-button-container">
            <div aria-hidden="true" className="fake-button btn">
              <div className="btn__bg btn__bg--primary"></div>
              <div className="btn__text btn__text--primary">Submit</div>
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
