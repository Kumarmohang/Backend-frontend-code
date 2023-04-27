<Accordion title={ele[0].year} key={ele[0].year + index}>
  <table>
    {ele.map((event) => {
      return (
        <Accordion title={event["event name"]} key={event["year"] + index}>
          <table>
            <tr>
              {Object.keys(event).map((key) => {
                return (
                  <>
                    <th>{key}</th>
                  </>
                );
              })}
            </tr>
            {/* <tr>
                        {Object.keys(event).map((key) => {
                          if (event[key] !== null) {
                            return (
                              <>
                                <td>{event[key][0]}</td>
                              </>
                            );
                          }
                        })}
                      </tr> */}
          </table>
        </Accordion>
      );
    })}
    {/* {Object.keys(ele).map((key, index) => {
                //console.log(event.length);
                //console.log({ index });
                if (
                  key !== "event key" &&
                  key !== "event name" &&
                  key !== "year" &&
                  key !== "race results"
                ) {
                  fivekeyHolder.push(key);
                  //console.log(fivekeyHolder);
                  if (fivekeyHolder.length === 5) {
                    const temp = fivekeyHolder;
                    fivekeyHolder = [];
                    //console.log(temp);
                    return (
                      <>
                        <tr className="row">
                          {temp.map((field) => {
                            //console.log(field);
                            return <th className="row">{field}</th>;
                          })}
                        </tr>
                        <tr
                          className="row"
                          key={event.year + event.points + event.position}
                        >
                          {temp.map((field) => {
                            return <td className="col">{event[field]}</td>;
                          })}
                        </tr>
                      </>
                    );
                  } else if (index === eventLength - 1) {
                    const tempKey = fivekeyHolder;
                    //console.log(tempKey);
                    fivekeyHolder = [];
                    return (
                      <>
                        <tr className="row">
                          {tempKey.map((field) => {
                            return <th className="row">{field}</th>;
                          })}
                        </tr>
                        <tr
                          className="row"
                          key={event.year + event.points + event.position}
                        >
                          {tempKey.map((field) => {
                            return <td className="col">{event[field]}</td>;
                          })}
                        </tr>
                      </>
                    );
                  }
                }
              })} */}
    {/* {"race results" in event ? (
              <div className="row nested_accordin">
                <Accordion title="Race Results" key={event.year + index}>
                  <table>
                    <tr>
                      <th>"hi"</th>
                    </tr>
                    {raceResult.map((race) => {
                      //console.log(race);
                      return (
                        <>
                          <tr>
                            {Object.keys(race).map((key) => {
                              console.log(key);
                              if (key !== "date" && key !== "circuit_key") {
                                return <th className="row">"shivam"</th>;
                              }
                            })}
                          </tr>
                          <tr>
                            {Object.keys(race).map((key) => {
                              console.log(key);
                              if (key !== "date" && key !== "circuit_key") {
                                return <td className="col">race[key]</td>;
                              }
                            })}
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </Accordion>
              </div>
            ) : (
              <tr>
                <th>Results</th>
                <th>-</th>
              </tr>
            )} */}
    {/* <tr className="row">
              {Object.keys(event).map((key) => {
                console.log(key);
                if (key !== "event name" && key !== "year") {
                  return <th className="row">{key}</th>;
                }
              })}
            </tr>
            <tr
              className="row"
              key={event.year + event.points + event.position}
            >
              {Object.keys(event).map((key) => {
                console.log(key);
                if (
                  key !== "event name" &&
                  key !== "year" &&
                  key !== "race results"
                ) {
                  return <td className="col">{event[key]}</td>;
                }
              })}
              <td className="col">{event.Result || "-"}</td>
            </tr> */}
  </table>
</Accordion>;
