import css from "../../Styles/index.module.scss";
import cls from "classnames";
import Skeleton from "react-loading-skeleton";
import { Grid } from "@geist-ui/core";

export default function AppLoader() {
  return (
    <div className={cls(css.container, "pt-0")}>
      <Grid.Container>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12} 
          className="align-items-center"
        >
          <Skeleton width={64} height={64} circle />
          <Skeleton width={150} height={50} className="ms-2" />
        </Grid>

        <Grid
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="flex-column align-items-end mt-4"
        >
          <Skeleton width={180} height={25} />
          <Skeleton width={160} height={15} />
          <Skeleton width={210} height={15} />
          <Skeleton width={100} height={15} />
        </Grid>

        <Grid xs={24} sm={24} md={24} lg={24} xl={24} className="mt-2">
          <Skeleton
            width={150}
            height={14}
            containerClassName={cls(css.loaderSkeletonContainer, "ms-2")}
            count={5}
          />
        </Grid>
      </Grid.Container>

      <Skeleton className="mt-5 opacity-gradient" height={600} />

      <div className={css.loaderSkeletonFooter}>
        <Skeleton width={125} height={18} className="me-2" />
        <Skeleton width={235} height={18} />
      </div>
    </div>
  );
}
