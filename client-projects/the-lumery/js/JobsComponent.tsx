import React, { useEffect, useState } from "react";
// import { Jobs as jobsJson } from "../../hunter-lumery/jobs.json";

export const JobsContainer = () => {
  const [isLoading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  // console.log("about to do getJobs");

  getJobsJSON(setLoading, setJobs);

  // console.log("doing getJobs");
  // useEffect(async () => {
  //   console.log("firing the hook in body");
  //   const response = await fetch(
  //     "https://tlmw-external.azurewebsites.net/api/JobPostingsTrigger?code=mQJYB4t8rc6p6Zr-Khjbk5srngBr_BVdgdDWdzIsMgJdAzFuuX4RDw==&format=json",
  //   );
  //   if (response.ok) {
  //     const responseString = await response.text();
  //     const doctoredString = responseString.slice(1, -1).replace(/\\/g, "");
  //     console.log(doctoredString);
  //     const json = JSON.parse(doctoredString);
  //     setJobs(json.Jobs);
  //     setLoading(false);
  //   } else {
  //     console.log("else case");
  //   }

  //   console.log("bottom of async block");
  // }, []);

  // console.log({ jobs });

  return JobsDisplay(isLoading, jobs);
};

const getJobsJSON = async (setLoading, setJobs) => {
  // console.log("doing getJobs");
  useEffect(async () => {
    // console.log("firing the hook");
    const response = await fetch(
      "https://tlmw-external.azurewebsites.net/api/JobPostingsTrigger?code=mQJYB4t8rc6p6Zr-Khjbk5srngBr_BVdgdDWdzIsMgJdAzFuuX4RDw==&format=json",
    );
    if (response.ok) {
      // const responseString = await response.text();
      // const doctoredString = responseString.slice(1, -1).replace(/\\/g, "");
      // console.log(doctoredString);
      const json = await response.json(); //JSON.parse(/*doctoredString ||*/ responseString);
      // console.log({ json });
      setJobs(json.jobs);
      setLoading(false);
    } else {
      console.log("else case");
    }
  }, []);
};

const JobsDisplay = (isLoading, jobJson) => {
  // TODO: yank out the async and see what happens
  // console.log(jobJson);
  return (
    <div className="margin-small">
      <div className="text-wrapper-hiring">
        <h2 className="heading-style-h2">Today we're hiring</h2>
        <div className="padding-bottom padding-small"></div>
        <div className="text-body-medium">
          Both data and Technology can be pretty flat without some bright minds
          and big hearts to bring the magic. That's where you come in.
        </div>
      </div>
      <div className="padding-bottom padding-large"></div>
      {isLoading ? (
        <p className="text-wrapper-ad">Loading jobs ...</p>
      ) : (
        <>
          {jobJson.length == 0 ? (
            <p>We couldn't load the available jobs, please check back later.</p>
          ) : (
            jobJson.map((job) => (
              <>
                <a href={job.link} className="ad-link w-inline-block">
                  <div className="text-wrapper-ad">
                    <h3 className="heading-style-h3 text-color-black">
                      {job.name}
                    </h3>
                    <div className="padding-bottom padding-small"></div>
                    <div className="link-ad-wrapper">
                      <div className="text-body-medium text-color-black">
                        {job.location}
                      </div>
                      <img
                        src="https://assets-global.website-files.com/652f0c1212d90b3e8dd3b570/652f0c1212d90b3e8dd3b583_Arrow%205.svg"
                        loading="lazy"
                        alt=""
                        className="image-8"
                      />
                    </div>
                  </div>
                </a>
                <div className="padding-bottom padding-large"></div>
              </>
            ))
          )}
        </>
      )}
    </div>
  );
};
