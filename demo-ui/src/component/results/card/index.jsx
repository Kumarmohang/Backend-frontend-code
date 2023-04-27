import "./card.scss";
const Card = ({
  item,
  onClick,
  showETHIco = false,
  type = "small",
  showAddBtn = false,
  onClickAdd,
  list = [],
  className = "",
  showCross = false,
  errorImage = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
}) => {
  const {
    id,
    thumbnail = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    key1,
    value1,
    year,
    key2,
    value2,
    header,
    title,
    disabled = false,
    is_nft: isNft = false,
    show_nft_ico: showNftIco = false,
    is_clickable: isClickable = false,
    link = "http://google.com",
    extraData,
  } = item;
  console.log(item,"from card component");
  const onCardClick = (item) => {
    if (isClickable) {
      window.open(link, "_blank");
    } else {
      onClick(item);
    }
  };

  const onError = (e) => {
    const { target } = e;
    target.src = errorImage;
  };
  return (
    <div
      className={`card ${type}${className ? " " + className : ""}`}
      onClick={() => !disabled && onCardClick(item)}
      style={{ cursor: !disabled ? "pointer" : "not-allowed",height:extraData === "Upcoming Auction" && "375px"}}
      // style={{ cursor: !disabled ? "pointer" : "not-allowed" }}
    >
      <header className="card-header">
        <span className="card-header-text" title={header || title}>
          {header || title}
        </span>
        {showAddBtn && (
          <span
            className={`ico${!list.includes(id) ? " add" : " remove"}`}
            title={`${
              !list.includes(id) ? "Add to" : "Remove from"
            } comparison list`}
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
              onClickAdd(list.includes(id));
            }}
          ></span>
        )}
        {showNftIco && (
          <span
            title={isNft ? "NFT token" : "Not a Nft"}
            className="nft-img"
            style={{ width: 15, height: 15 }}
          >
            <img
              title={isNft ? "NFT token" : "Not a Nft"}
              src="https://miro.medium.com/max/1482/1*dNK9uuAL5NrjXvG9AvwmSw.png"
              loading="lazy"
              alt="Nft Token indecator"
              referrerPolicy="no-referrer"
              style={{
                width: 15,
                height: 15,
                filter: isNft ? "none" : "opacity(0.3)",
              }}
            />
          </span>
        )}
      </header>
      <div className={`card-thumbnail${!showCross ? "" : " cross"}`}>
        <div className="card-thumbnail-img">
          <img
            src={thumbnail}
            referrerPolicy="no-referrer"
            alt="img"
            onError={(e) => onError(e)}
          />
        </div>
      </div>
      <div className="card-desc">
        <div className="section left">
          <div className="label">{key1 || "Release Year"}</div>
          <div className={`value ${key1 || "Release Year"}`}>
            {value1 || year}
          </div>
        </div>
        <div className="section right">
          <div className="label">{key2}</div>
          <div className={`value ${key2}`}>
            {showETHIco && (
              <span className="ico">
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH"
                />
              </span>
            )}
            {value2}
          </div>
        </div>
      </div>
      {extraData && (
        <div className="extra-info">
          <div className="value">{extraData}</div>
        </div>
      )}
    </div>
  );
};

export default Card;

/*
["60d1de1fb0f6ded5d98c435d",
"60d1de23b0f6ded5d98c435f",
"60d1de26b0f6ded5d98c4361",
"60d1dea9b0f6ded5d98c4371",
"60d1e09daea1b35462a1df74",
"60d1e4d2f57766be5f873b2c",
"60d1e548f57766be5f873b34",
"60d1e54bf57766be5f873b36",
"60d1e01eaea1b35462a1df6a",
"60d1ef8ea55dd61c125b8cbd",
"60d1f03812647cdc07e18667",
"60d1f00b12647cdc07e18661",
"60d1f2906626487b26bfafde",
"60d1ef91a55dd61c125b8cbf",
"60d1f5430afc27e85ce7d44a",
"60d1f5460afc27e85ce7d44c",
"60d1f54b0afc27e85ce7d44e",
"60d1f91ff91f7f9e85a45ca7",
"60d1fc77dda7dd173907cfe0",
"60d209b3b2ccdaeefc198a45",
"60d20a64b2ccdaeefc198a53",
"60d20bacb2ccdaeefc198a73",
"60d20bb2b2ccdaeefc198a77",
"60d20ba1b2ccdaeefc198a6d",
"60d20bb9b2ccdaeefc198a7b",
"60d20bb6b2ccdaeefc198a79",


"60d1de9cb0f6ded5d98c4369",
"60d1dea3b0f6ded5d98c436d",
"60d1dea0b0f6ded5d98c436b",
"60d1dea7b0f6ded5d98c436f",
"60d1e095aea1b35462a1df72",
"60d1e0a4aea1b35462a1df78",
"60d1e0a0aea1b35462a1df76",
"60d1e4cff57766be5f873b2a",
"60d1edbf17fd182d880aaf9b",
"60d1e54ff57766be5f873b38",
"60d1e552f57766be5f873b3a",
"60d1e01aaea1b35462a1df68",
"60d20bafb2ccdaeefc198a75",
"60d20d46ec9bc260f3855b64",
"60d20d49ec9bc260f3855b66",
"60d20d75ec9bc260f3855b6c",
"60d20d7cec9bc260f3855b70",
"60d20e6678d43128948235db",
"60d210d7854a69108fa72ef5",
"60d21131854a69108fa72f01",
"60d210d2854a69108fa72ef3",
"60d212cba26db5a5c1350954",
"60d21288c2cddc3570d0165e",
"60d212cea26db5a5c1350956",
"60d1f03412647cdc07e18665",
"60d1eeffeba699aea7a8c81f",
"60d1f0f726b84d191f318b41",
"60d1f0fb26b84d191f318b43",
"60d1f0fd26b84d191f318b45",
"60d1f54d0afc27e85ce7d450",
"60d1f71cf91f7f9e85a45c85",


"60d1f77ff91f7f9e85a45c8d",
"60d1f7a8f91f7f9e85a45c91",
"60d210a9854a69108fa72eef",
"60d21100854a69108fa72ef9",
"60d2112a854a69108fa72efd",
"60d21134854a69108fa72f03",
"60d21137854a69108fa72f05",
"60d2112d854a69108fa72eff",
"60d212c3a26db5a5c1350950",
"60d215de80f48bf38b3161fe",
"60d21939506c955bc20f5783",
"60d21a811fe558259cef6c20",
"60d21aab1fe558259cef6c24",
"60d21aae1fe558259cef6c26",
"60d21ab21fe558259cef6c28",
"60d21adb1fe558259cef6c2c",
"60d21b051fe558259cef6c30",
"60d21b2f1fe558259cef6c34",


"60d21bdbe5f3bf90847daf9a",
"60d21c0be5f3bf90847dafa2",
"60d209dbb2ccdaeefc198a49",
"60d20a3bb2ccdaeefc198a4f",
"60d20ab3b2ccdaeefc198a59",
"60d20b4cb2ccdaeefc198a63",
"60d20b78b2ccdaeefc198a69",
"60d20b74b2ccdaeefc198a67",
"60d20ba5b2ccdaeefc198a6f",
"60d20ba9b2ccdaeefc198a71",
"60d2177f506c955bc20f5767",
"60d217d7506c955bc20f576d",
"60d21833506c955bc20f5773",
"60d21837506c955bc20f5775",
"60d21b61e5f3bf90847daf90",
"60d21c03e5f3bf90847daf9e",
"60d21d519c98c58fd189fda8",
"60d20cf1ec9bc260f3855b5a",
"60d20d40ec9bc260f3855b60",
"60d20d44ec9bc260f3855b62",
"60d20d4cec9bc260f3855b68",
"60d20d78ec9bc260f3855b6e",
"60d20e6378d43128948235d9",
"60d20e6978d43128948235dd",
"60d21059854a69108fa72ee9",
"60d21171c2cddc3570d0164a",


"60d212c7a26db5a5c1350952",
"60d2127dc2cddc3570d0165a",
"60d21454f3ab951fd6dbc76e",
"60d21b341fe558259cef6c36",
"60d21bd7e5f3bf90847daf98",
"60d21c07e5f3bf90847dafa0",
"60d21e80b8a0cabeb6789f45",
"60d21e88b8a0cabeb6789f49",
"60d21e85b8a0cabeb6789f47",
"60d220aab47afbcf408addb4",
"60d225a512f1912725cd2280",
"60d225a112f1912725cd227e",
"60d225a812f1912725cd2282"]
*/

/*
Unquestionably, the 1970s had been good to Ferrari, the second half of the decade particularly so. Three World Drivers’ Championships and four Constructors’ titles in five years had brought success to Maranello on a scale unseen since the glory days of Ascari in the early 1950s. However, the new decade provided a serious reality check. If 1979 had been a triumph—with Jody Scheckter crowned World Champion and the Scuderia securing a resounding victory in the Constructors’ standings—then the paltry eight World Championship points scored the following season were an unmitigated disaster.

For 1981, Ferrari embraced the emerging turbo technology with the design of a new car powered by a ferociously powerful 1.5-litre V-6 turbocharged engine, the 126CK. With a chassis derived from the previous year’s flat 12-cylinder 312 T5, the narrower V-6 engine permitted the area of ground effects to be exploited more comprehensively than had previously been the case. However, it soon became apparent that the car’s surface aerodynamics were rather less efficient, and a noticeable lack of downforce combined with the new engine’s sudden power delivery made the 126CK far from driver-friendly. Nevertheless, lead driver Gilles Villeneuve took victories in Monaco and Spain en route to 5th place in the Constructors’ championship, thereby ensuring that Ferrari were at least spared humiliation for a second consecutive season.

For 1982, the team recruited highly rated ex–Hesketh and Wolf designer Harvey Postlethwaite to carry out an immediate redesign of the 126CK, centring around the replacement of the T5-derived chassis with a new structure constructed exclusively from aluminium honeycomb. Further improvements were also made to the engine—both in terms of power delivery and reliability—and to the aerodynamics, with mid-corner stability being a particular area of focus.

From the outset, Villeneuve and teammate Didier Pironi noted that the new car, dubbed 126 C2, was a considerable step forward from its unwieldly predecessor. Indeed, Villeneuve crossed the line in Long Beach—only the car’s third race—in 3rd place, only to be disqualified for an illegal rear wing. In the next race at Imola, the 126 C2 scored its first win, albeit in the most controversial of circumstances when Pironi disobeyed team orders to pass Villeneuve on the final lap. At Zolder, two weeks later, the air of acrimony in the team would be displaced by one of devastation when Villeneuve—still incensed by Pironi’s behaviour in San Marino—perished in a horrific accident in qualifying.

Still reeling from the popular Canadian’s death, the Scuderia recruited debonair Frenchman Patrick Tambay as his replacement from the Dutch Grand Prix onwards. In only his second race with the team, Tambay used this particular chassis—061—to take a fine 3rd place in the British Grand Prix at Brands Hatch behind teammate Pironi and race winner Niki Lauda’s McLaren. Only a week later, 061 was in action again in the French Grand Prix at Paul Ricard, Tambay finishing a creditable 4th in a French 1-2-3-4 behind Arnoux, Prost, and Pironi. The German Grand Prix weekend started traumatically for Ferrari, with Pironi suffering a horrendous qualifying crash in which he sustained career-ending multiple leg fractures. Tambay meanwhile—driving 061 again—had qualified in 5th place and proceeded to take advantage of Pironi’s absence to record his maiden Grand Prix victory after a measured drive in difficult circumstances.

Following Tambay’s 4th place in 061 at the Austrian Grand Prix, the car was driven by Ferrari returnee (and tifosi favourite) Mario Andretti at Monza, where the popular Italian-born Pennsylvanian rewarded the crowd with a supreme pole position which belied his 42 years. In the race, however, Andretti made a poor start and suffered from a sticking throttle throughout, which relegated him to 3rd place at the finish behind race winner Rene Arnoux’s Renault and Tambay’s sister Ferrari.

Andretti was retained to drive 061 in the final round of the 1982 World Championship at the Caesar’s Palace Grand Prix in Las Vegas, his 128th and final Grand Prix. The weekend would prove to be a tough one for the team, Andretti qualifying only 7th before retiring with suspension failure on lap 26, and Tambay failing to even take the start, having suffered a recurrence of a long-standing back injury after qualifying 8th.

However, having gone into the race with a three-way battle for Constructor’s championship honours with McLaren and Renault, Ferrari secured the title by virtue of Niki Lauda’s failure to finish and Prost’s relatively lowly 4th-place finish for Renault. After the tragedy of Zolder and the trauma of Hockenheim, few would have begrudged the Scuderia the accolade. Meanwhile, a surprised Keke Rosberg took the Drivers’ crown, having won only one race all season but displaying remarkable consistency. Significantly, Pironi would finish 2nd in the Drivers’ standings despite having competed in only 11 of the 16 Championship rounds, whilst Tambay’s 7th place in the championship—having only started six races—marked him as someone to watch in future years.

Following its career as a Works car, 061 was sold to Jacques Setton in 2000, joining numerous other Formula One and Sports Prototype Ferraris in his collection at Chateau de Wideville, near Paris. From Setton, 061 passed to a Dutch Ferrari collector before being sold again to German enthusiast Michael Willms. During the latter’s ownership roughly fifteen years ago, the car was fully restored by Uwe Meissner’s Modena Motorsport operation and ran in official Ferrari F1 Corse Clienti events.

The significance of the 126 C2 in Ferrari history is difficult to overstate. After the solid foundations laid by the 126CK, the C2’s Constructors’ title in 1982 started a remarkable sequence which remains intact to this day, Ferrari having finished no lower than 4th in the standings since. Significantly, 061 remains the only surviving 126 C2. That it is the car in which Mario Andretti scored his final pole position, podium finish, and World Championship points in Formula One merely adds to its historical significance. Immaculately prepared, 061 is ready for immediate enjoyment by its fortunate new owner and would assuredly be a welcome and highly significant addition to any single-seater or competition-focused car collection.

*/
