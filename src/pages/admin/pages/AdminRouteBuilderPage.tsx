import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageHeader } from "../components/PageHeader";
import * as styles from "../components/ui.css";
import { ROUTE_THEMES } from "../constants";
import {
  useAdminRouteDetail,
  useCreateAdminRoute,
  useUpdateAdminRoute,
} from "../hooks/useAdminContents";
import { toAdminErrorMessage } from "../lib/adminCache";
import type { RouteFormErrors } from "../lib/routeStops";
import {
  addStop,
  moveStop,
  removeStop,
  setStopDay,
  updateStopNext,
  validateRouteForm,
} from "../lib/routeStops";
import type { AdminRouteStop } from "../types";
import { RoutePlaceSearch } from "./RoutePlaceSearch";
import { RouteStopList } from "./RouteStopList";

const LIST_PATH = "/admin/contents?tab=routes";

export function AdminRouteBuilderPage() {
  const { routeId } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(routeId);
  const detailQuery = useAdminRouteDetail(routeId);

  const createRoute = useCreateAdminRoute();
  const updateRoute = useUpdateAdminRoute();

  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [stops, setStops] = useState<AdminRouteStop[]>([]);

  const [errors, setErrors] = useState<RouteFormErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);

  const detail = detailQuery.data;

  /** 수정 화면은 상세를 받아 폼을 채웁니다. */
  useEffect(() => {
    if (!detail) return;

    setName(detail.name);
    setTheme(detail.theme);
    setDescription(detail.description);
    setIsPublished(detail.isPublished);
    setStops(detail.stops);
    setIsDirty(false);
  }, [detail]);

  /**
   * 작성 중 탭을 닫거나 새로고침하면 브라우저가 한 번 물어봅니다.
   * 경유지를 여러 개 담아 둔 상태에서 실수로 닫으면 처음부터 다시 해야 합니다.
   */
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const addedPlaceIds = new Set(stops.map((stop) => stop.placeId));

  /** 경유지가 바뀌면 순서·구간 정보를 다시 맞춘 결과로 갈아끼웁니다. */
  const applyStops = (next: AdminRouteStop[]) => {
    setStops(next);
    setIsDirty(true);
    // 경유지가 채워지면 관련 오류 문구는 바로 걷습니다.
    setErrors((previous) => ({ ...previous, stops: undefined }));
  };

  const save = () => {
    const nextErrors = validateRouteForm({ name, theme, stops });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      name: name.trim(),
      theme,
      description: description.trim(),
      isPublished,
      stops,
    };

    const handleSaved = () => {
      setIsDirty(false);
      navigate(LIST_PATH);
    };

    if (isEditing && routeId) {
      updateRoute.mutate({ routeId, payload }, { onSuccess: handleSaved });
    } else {
      createRoute.mutate(payload, { onSuccess: handleSaved });
    }
  };

  const handleSave = () => {
    // 즉시 게시는 서비스 사용자에게 바로 보이므로 한 번 확인합니다.
    if (isPublished) {
      setIsPublishConfirmOpen(true);
      return;
    }

    save();
  };

  const mutation = isEditing ? updateRoute : createRoute;
  const isSaving = mutation.isPending;

  if (isEditing && detailQuery.isPending) {
    return (
      <>
        <PageHeader title="큐레이션 코스 수정" description="" />
        <p className={styles.tableStateCell}>불러오는 중…</p>
      </>
    );
  }

  if (isEditing && detailQuery.isError) {
    return (
      <>
        <PageHeader title="큐레이션 코스 수정" description="" />
        <p className={styles.inlineError} role="alert">
          코스를 불러오지 못했어요.
        </p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={isEditing ? "큐레이션 코스 수정" : "큐레이션 코스 등록"}
        description="장소를 조합해 마스터 추천 코스를 만듭니다."
      />

      <section className={`${styles.panel} ${styles.builderSection}`}>
        <h2 className={styles.sectionTitle}>기본 정보</h2>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="route-name">
              코스명
            </label>
            <input
              id="route-name"
              className={styles.input}
              value={name}
              placeholder="예: 영도 해안가 산책 1일"
              onChange={(event) => {
                setName(event.target.value);
                setIsDirty(true);
              }}
            />
            {errors.name && (
              <span className={styles.fieldError}>{errors.name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="route-theme">
              테마
            </label>
            <select
              id="route-theme"
              className={styles.select}
              value={theme}
              onChange={(event) => {
                setTheme(event.target.value);
                setIsDirty(true);
              }}
            >
              <option value="">선택</option>
              {ROUTE_THEMES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.theme && (
              <span className={styles.fieldError}>{errors.theme}</span>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>게시</span>
            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) => {
                  setIsPublished(event.target.checked);
                  setIsDirty(true);
                }}
              />
              저장과 동시에 게시
            </label>
          </div>
        </div>

        <div className={styles.formGridWide}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="route-description">
              설명
            </label>
            <textarea
              id="route-description"
              className={styles.textarea}
              value={description}
              placeholder="코스를 소개하는 문구를 적어 주세요."
              onChange={(event) => {
                setDescription(event.target.value);
                setIsDirty(true);
              }}
            />
          </div>
        </div>
      </section>

      <div className={styles.builderColumns}>
        <RoutePlaceSearch
          addedPlaceIds={addedPlaceIds}
          onAdd={(place) => applyStops(addStop(stops, place))}
        />

        <RouteStopList
          stops={stops}
          onMove={(index, toSequence) =>
            applyStops(moveStop(stops, index, toSequence))
          }
          onChangeDay={(index, dayNumber) =>
            applyStops(setStopDay(stops, index, dayNumber))
          }
          onChangeNext={(index, patch) =>
            applyStops(updateStopNext(stops, index, patch))
          }
          onRemove={(index) => applyStops(removeStop(stops, index))}
        />
      </div>

      <div className={styles.panel}>
        {mutation.error && (
          <p className={styles.inlineError} role="alert">
            {toAdminErrorMessage(mutation.error, "저장하지 못했어요.")}
          </p>
        )}

        <div className={styles.formActions}>
          <span className={styles.formActionsNote}>
            {errors.stops ?? `경유지 ${stops.length}곳`}
          </span>

          <Button onClick={() => navigate(LIST_PATH)} disabled={isSaving}>
            취소
          </Button>
          <Button tone="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중…" : isEditing ? "수정 저장" : "코스 등록"}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isPublishConfirmOpen}
        title="저장과 동시에 게시할까요?"
        description={`${name.trim() || "이 코스"}이(가) 저장 즉시 서비스 추천 목록에 노출됩니다.`}
        confirmLabel="저장하고 게시"
        isPending={isSaving}
        onConfirm={() => {
          setIsPublishConfirmOpen(false);
          save();
        }}
        onCancel={() => setIsPublishConfirmOpen(false)}
      />
    </>
  );
}
