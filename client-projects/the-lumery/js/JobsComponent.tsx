import React, { useEffect, useState } from "react";

export const JobsContainer = () => {
  const [isLoading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  getJobsJSON(setLoading, setJobs);

  return JobsDisplay(isLoading, jobs);
};

const getJobsJSON = async (setLoading, setJobs) => {
  useEffect(async () => {
    const response = await fetch(
      "https://tlmw-external.azurewebsites.net/api/JobPostingsTrigger?code=mQJYB4t8rc6p6Zr-Khjbk5srngBr_BVdgdDWdzIsMgJdAzFuuX4RDw==&format=json",
    );
    if (response.ok) {
      const json = await response.json();
      setJobs(json.jobs);
      setLoading(false);
    }
  }, []);
};

const JobsDisplay = (isLoading, jobJson) => {
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
