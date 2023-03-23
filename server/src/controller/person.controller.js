import responHandle from "../handler/respon.handle.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.personDetail({ personId });
    responHandle.ok(res, person);
  } catch (error) {
    responHandle.err(res);
  }
};
const personMedia = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMeida({ personId });
    responHandle.ok(res, medias);
  } catch (error) {
    responHandle.err(err);
  }
};

export default { personDetail, personMedia };
