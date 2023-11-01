import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const JobsContainer = () => {
  const [isLoading, setLoading] = useState(true);
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
      const responseString = await response.text();
      const doctoredString = responseString.slice(1, -1).replace(/\\/g, "");
      console.log(doctoredString);
      const json = JSON.parse(doctoredString);
      setJobs(json.Jobs);
      setLoading(false);
    }
  }, []);
};

const JobsDisplay = (isLoading, jobJson) => {
  console.log(jobJson);
  return (
    <div className="margin-small">
      <div className="text-wrapper-hiring">
        <h2 className="heading-style-h3">Today we're hiring</h2>
        <div class="padding-bottom padding-small"></div>
        <div class="text-body-medium">
          Both data and Technology can be pretty flat without some bright minds
          and big hearts to bring the magic. That's where you come in.
        </div>
      </div>
      <div class="padding-bottom padding-large"></div>
      {isLoading ? (
        <p className="text-wrapper-ad">Loading jobs ...</p>
      ) : (
        <>
          {jobJson.length == 0 ? (
            <p>We couldn't load the available jobs, please check back later.</p>
          ) : (
            jobJson.map((job) => (
              <>
                <a href={job.Link} className="ad-link w-inline-block">
                  <div className="text-wrapper-ad">
                    <h3 className="heading-style-h2 text-color-black">
                      {job.Name}
                    </h3>
                    <div className="padding-bottom padding-small"></div>
                    <div className="link-ad-wrapper">
                      <div className="text-body-medium text-color-black">
                        {job.Location}
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
                <div class="padding-bottom padding-large"></div>
              </>
            ))
          )}
        </>
      )}
    </div>
  );
};

const getJobsHTML = async () => {
  const response = await fetch(
    "https://thelumerymiddlewarefunctionsexternal.azurewebsites.net/api/JobPostingsTrigger?code=U7K/iDr2KvzAN0SQF3ygXjagEtXkBPI67CgY/MUq4AKr6w/iYyt3gQ==",
  );

  return await response.text();
};

const main = async () => {
  const root = createRoot(document.getElementById("react-root"));
  root.render(<JobsContainer />);
};

main();
