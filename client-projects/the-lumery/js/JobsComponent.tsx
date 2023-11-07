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
    <>
      {isLoading ? (
        <p className="text-wrapper-ad">Loading jobs ...</p>
      ) : (
        <>
          {jobJson.length == 0 ? (
            <p>We couldn't load the available jobs, please check back later.</p>
          ) : (
            jobJson.map((job) => (
              <div>
                <a href={job.link} className="jobs__ad">
                  <div>
                    <h3 className="jobs__job-header">{job.name}</h3>
                    <div className="jobs__job-subheader">
                      <div>{job.location}</div>
                      <img
                        src="https://assets-global.website-files.com/652f0c1212d90b3e8dd3b570/652f0c1212d90b3e8dd3b583_Arrow%205.svg"
                        loading="lazy"
                        alt=""
                        className="jobs__job-arrow"
                      />
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};
