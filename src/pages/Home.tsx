import useTemplate from "../hooks/useTemplate";
import { Link } from "react-router-dom";

import Image from "../assets/template.png";

const Home = () => {
  const { templates } = useTemplate();

  return (
    <div className="home w-full flex-1 px-16 py-14">
      <h3 className="text-lg font-semibold mb-5">All Templates</h3>
      {templates.length > 0 ? (
        <div className="grid grid-cols-8">
          {templates.map((t) => (
            <Link
              className="w-28 flex flex-col items-center"
              key={t.id}
              to={`/template/${t.id}`}
            >
              <div className="image">
                <img src={Image} alt="template" />
              </div>

              <span className="font-semibold text-sm">{t.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div>No Templates :(</div>
      )}
    </div>
  );
};

export default Home;
