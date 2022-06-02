import Skeleton from "react-loading-skeleton";
import css from "../../Styles/index.module.scss";
import { Grid } from "@geist-ui/core";

export default function WeatherForecastLoader() {
  return (
    <div className="w-100 mt-4 opacity-gradient ">
      <Skeleton
        width="150px"
        height={28}
        containerClassName="w-100"
        className="mb-2"
      />
      <Grid.Container gap={1}>
        <Grid xs={8} sm={8} md={8} lg={8}>
          <Skeleton height={36} containerClassName="w-100" className="mb-2" />
        </Grid>
        <Grid xs={16} sm={16} md={16} lg={16} className="mb-0 mb-0">
          <Skeleton height={36} containerClassName="w-100" className="mb-1" />
        </Grid>

        <Grid xs={24} sm={24} md={24} lg={24}>
          <Skeleton
            width={150}
            height={36}
            containerClassName="mb-2"
            style={{ transform: "translateY(-1rem)" }}
          />
        </Grid>
      </Grid.Container>

      <Skeleton height={250} containerClassName="w-100" className="mb-2" />

      <div className={css.weatherDayLoader}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton height={80} className="mb-2" key={index} />
          ))}
      </div>
    </div>
  );
}
