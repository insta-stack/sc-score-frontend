import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PortalLayout from '../../components/layout/PortalLayout'
import MagicBento from '../../components/shared/MagicBento'
import SpecularButton from '../../components/shared/SpecularButton'
import { getSellerDashboardApi } from '../../api/dashboard'
import { toast } from '../../hooks/use-toast'

import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Flag,
  Package,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  UserCheck,
  Zap,
} from 'lucide-react'


/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function SellerDashboard() {
  const { user } = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadDashboard = async () => {
      try {
        const response = await getSellerDashboardApi()

        if (!cancelled) {
          setData(response)
        }
      } catch (err) {
        if (!cancelled) {
          toast({
            title: 'Could not load dashboard',
            description:
              err?.response?.data?.detail ||
              'Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  const sellerName =
    data?.name ||
    user?.name ||
    'Seller'

  const score =
    Number(data?.score?.credibility_score ?? 750)

  const totalOrders =
    data?.total_orders ?? 0

  const successRate =
    data?.success_rate ??
    data?.metrics?.success_rate ??
    '98.2%'

  const returnRate =
    data?.return_rate ??
    data?.refund_rate ??
    data?.metrics?.return_rate ??
    data?.metrics?.refund_rate ??
    '1.4%'

  const disputeRate =
    data?.dispute_rate ??
    data?.metrics?.dispute_rate ??
    '0.4%'

  const orders =
    Array.isArray(data?.orders)
      ? data.orders
      : []

  return (
    <PortalLayout portal="sellers">
      <div className="seller-dashboard">

        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div className="seller-dashboard__background">
          <div className="seller-dashboard__grid" />

          <div className="seller-dashboard__glow seller-dashboard__glow--one" />
          <div className="seller-dashboard__glow seller-dashboard__glow--two" />
        </div>


        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="seller-dashboard__header">
          <div className="seller-dashboard__header-inner">

            <div className="seller-brand">
              <div className="seller-brand__icon">
                <Store size={16} />
              </div>

              <div>
                <div className="seller-brand__name">
                  Seller Dashboard
                </div>

                <div className="seller-brand__sub">
                  Nexus Insight
                </div>
              </div>
            </div>

            <div className="seller-header-actions">
              <button
                type="button"
                className="seller-header-action"
                aria-label="Notifications"
              >
                <Sparkles size={15} />
              </button>

              <button
                type="button"
                className="seller-header-action"
                aria-label="Security"
              >
                <ShieldCheck size={15} />
              </button>

              <button
                type="button"
                className="seller-header-action"
                aria-label="Account"
              >
                <UserCheck size={15} />
              </button>

              <div className="seller-avatar">
                {sellerName.charAt(0).toUpperCase()}
              </div>
            </div>

          </div>
        </header>


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <main className="seller-dashboard__content">

          {/* ===================================================
              HERO
          ================================================== */}

          <section className="seller-dashboard__hero">

            <div className="seller-dashboard__eyebrow">
              SELLER DASHBOARD
            </div>

            <h1>
              Welcome, <span>{sellerName}</span>
            </h1>

            <p>
              Manage your credibility and performance metrics with
              real-time personalized insights.
            </p>

          </section>


          {loading ? (

            <DashboardLoader />

          ) : (

            <>
              {/* =================================================
                  SCORE + METRICS
              ================================================== */}

              <section className="seller-overview">

                <div className="seller-score-area">

                  <MagicBento
                    items={[
                      {
                        id: 'credibility-score',
                        title: 'Credibility Score',
                        description: '',
                        label: 'YOUR CREDIBILITY SCORE',
                      },
                    ]}
                    columns={1}
                    enableStars
                    enableSpotlight
                    enableBorderGlow
                    enableTilt={false}
                    enableMagnetism
                    clickEffect
                    particleCount={8}
                    glowColor="132, 0, 255"
                    renderItem={() => (
                      <ScoreContent score={score} />
                    )}
                  />

                </div>


                <div className="seller-metrics">

                  <MetricBento
                    items={[
                      {
                        id: 'orders',
                        label: 'TOTAL ORDERS',
                        value: totalOrders.toLocaleString('en-IN'),
                        icon: <Package size={15} />,
                      },
                      {
                        id: 'success',
                        label: 'SUCCESS RATE',
                        value: successRate,
                        icon: <CheckCircle2 size={15} />,
                        positive: true,
                      },
                      {
                        id: 'returns',
                        label: 'RETURN RATE',
                        value: returnRate,
                        icon: <RefreshCcw size={15} />,
                        negative: true,
                      },
                      {
                        id: 'disputes',
                        label: 'DISPUTE RATE',
                        value: disputeRate,
                        icon: <AlertTriangle size={15} />,
                        negative: true,
                      },
                    ]}
                  />

                </div>

              </section>


              {/* =================================================
                  PERFORMANCE + GRIEVANCE
              ================================================== */}

              <section className="seller-action-grid">

                 <MagicBento
                  items={[
                    {
                      id: 'performance',
                      label: 'INSIGHTS',
                      title: 'Performance Tips',
                      description:
                        'Simple actions that can improve your seller credibility.',
                    },
                  ]}
                  columns={1}
                  enableStars
                  enableSpotlight
                  enableBorderGlow
                  enableTilt={false}
                  enableMagnetism
                  clickEffect
                  particleCount={7}
                  glowColor="132, 0, 255"
                  renderItem={() => (
                    <PerformanceTips />
                  )}
                /> 


                <MagicBento
                  items={[
                    {
                      id: 'grievance',
                      label: 'SUPPORT',
                      title: 'Submit Grievance',
                      description:
                        'Submit an issue directly to the SC Score team.',
                    },
                  ]}
                  columns={1}
                  enableStars
                  enableSpotlight
                  enableBorderGlow
                  enableTilt={false}
                  enableMagnetism
                  clickEffect
                  particleCount={7}
                  glowColor="132, 0, 255"
                  renderItem={() => (
                    <GrievanceCard />
                  )}
                />

              </section>


              {/* =================================================
                  PREMIUM
              ================================================== */}

              <section className="seller-premium">

                <div className="seller-premium__content">

                  <div className="seller-premium__icon">
                    <Zap size={19} />
                  </div>

                  <div>
                    <h2>
                      Upgrade to Premium
                    </h2>

                    <p>
                      Unlock advanced analytics, deeper platform
                      insights, and priority support.
                    </p>
                  </div>

                </div>


                <SpecularButton
                  type="button"
                  size="md"
                  radius={28}
                  tint="#ffffff"
                  tintOpacity={0.9}
                  blur={4}
                  textColor="#4c1d95"
                  lineColor="#ffffff"
                  baseColor="#c4b5fd"
                  intensity={1.15}
                  shineSize={12}
                  shineFade={35}
                  thickness={1.2}
                  speed={0.4}
                  followMouse
                  proximity={260}
                  autoAnimate={false}
                  className="premium-button"
                >
                  Go Premium Now
                  <ArrowRight size={14} />
                </SpecularButton>

              </section>


              {/* =================================================
                  RECENT ORDERS
              ================================================== */}

              <section className="seller-orders">

                <div className="seller-orders__header">

                  <div>
                    <div className="seller-orders__title-row">
                      <ClockIcon />

                      <h2>
                        Recent Orders
                      </h2>
                    </div>

                    <p>
                      Latest seller transactions
                    </p>
                  </div>

                  <button
                    type="button"
                    className="seller-history-button"
                  >
                    View All History
                    <ChevronRight size={14} />
                  </button>

                </div>


                {orders.length > 0 ? (

                  <div className="seller-orders__table-wrap">

                    <table className="seller-orders__table">

                      <thead>
                        <tr>
                          <th>ORDER #</th>
                          <th>PLATFORM</th>
                          <th>AMOUNT</th>
                          <th>STATUS</th>
                          <th>DATE</th>
                        </tr>
                      </thead>

                      <tbody>

                        {orders
                          .slice(0, 6)
                          .map((order, index) => (

                            <tr
                              key={
                                order.order_number ||
                                `order-${index}`
                              }
                            >

                              <td className="order-id">
                                {order.order_number || '—'}
                              </td>

                              <td>
                                {order.platform_name || '—'}
                              </td>

                              <td>
                                {order.amount != null
                                  ? `₹${Number(
                                      order.amount
                                    ).toLocaleString(
                                      'en-IN'
                                    )}`
                                  : '—'}
                              </td>

                              <td>
                                <StatusBadge
                                  value={
                                    order.order_outcome
                                  }
                                />
                              </td>

                              <td>
                                {formatDate(
                                  order.created_at ||
                                  order.order_date ||
                                  order.date
                                )}
                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </table>

                  </div>

                ) : (

                  <div className="seller-orders__empty">

                    <Package
                      size={23}
                    />

                    <p>
                      No orders yet.
                    </p>

                    <span>
                      Your latest transactions will appear here.
                    </span>

                  </div>

                )}

              </section>

            </>

          )}

        </main>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="seller-footer">

          <div className="seller-footer__inner">

            <div className="seller-footer__brand">
              SC Score
            </div>

            <div className="seller-footer__links">

              <a href="#">
                Privacy Policy
              </a>

              <a href="#">
                Terms of Service
              </a>

              <a href="#">
                Security
              </a>

              <a href="#">
                Contact
              </a>
               <a href="#">
                hOME
              </a>
            </div>

            <div className="seller-footer__copy">
              © 2026 SC Score. All rights reserved.
            </div>

          </div>

        </footer>


        {/* =====================================================
            PAGE STYLES
        ====================================================== */}

        <style>{`
          @import url(
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&family=JetBrains+Mono:wght@500&display=swap'
          );

          .seller-dashboard {
            --sd-bg: #0d1112;
            --sd-surface: #131719;
            --sd-surface-2: #171a1d;
            --sd-border: rgba(255,255,255,.10);
            --sd-border-strong: rgba(210,187,255,.20);

            --sd-text: #f3eef8;
            --sd-muted: #918c97;
            --sd-muted-2: #67616c;

            --sd-purple: #762ff0;
            --sd-purple-light: #c9b0ff;
            --sd-green: #6ff2bc;
            --sd-red: #ff8e9b;

            min-height: 100vh;
            position: relative;
            overflow: hidden;

            background: var(--sd-bg);
            color: var(--sd-text);

            font-family: Inter, sans-serif;
          }

          .seller-dashboard__background {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .seller-dashboard__grid {
            position: absolute;
            inset: 0;

            background-image:
              radial-gradient(
                rgba(255,255,255,.18) 1px,
                transparent 1px
              );

            background-size: 23px 23px;
            opacity: .18;
            mask-image: linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
          }

          .seller-dashboard__glow {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            filter: blur(110px);
          }

          .seller-dashboard__glow--one {
            left: 15%;
            top: 8%;
            background: rgba(118,47,240,.06);
          }

          .seller-dashboard__glow--two {
            right: 3%;
            bottom: 10%;
            background: rgba(120,75,255,.05);
          }

          /* =====================================================
             HEADER
          ====================================================== */

          .seller-dashboard__header {
            position: relative;
            z-index: 5;

            border-bottom: 1px solid rgba(255,255,255,.07);
            background: rgba(13,17,18,.76);

            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .seller-dashboard__header-inner {
            width: min(1180px, calc(100% - 40px));
            min-height: 62px;

            margin: 0 auto;

            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .seller-brand {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .seller-brand__icon {
            width: 30px;
            height: 30px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 8px;

            background: rgba(118,47,240,.13);
            border: 1px solid rgba(210,187,255,.16);

            color: var(--sd-purple-light);
          }

          .seller-brand__name {
            font-family: Sora, sans-serif;
            font-size: 12px;
            font-weight: 600;
          }

          .seller-brand__sub {
            margin-top: 1px;
            color: var(--sd-muted-2);
            font-family: 'JetBrains Mono', monospace;
            font-size: 7px;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .seller-header-actions {
            display: flex;
            align-items: center;
            gap: 7px;
          }

          .seller-header-action {
            width: 31px;
            height: 31px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 8px;

            border: 1px solid rgba(255,255,255,.07);
            background: rgba(255,255,255,.015);

            color: var(--sd-muted);

            cursor: pointer;

            transition:
              color .18s ease,
              border-color .18s ease,
              background .18s ease;
          }

          .seller-header-action:hover {
            color: var(--sd-purple-light);
            border-color: rgba(210,187,255,.25);
            background: rgba(118,47,240,.08);
          }

          .seller-avatar {
            width: 31px;
            height: 31px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin-left: 5px;

            border-radius: 50%;

            border: 1px solid rgba(210,187,255,.35);
            background:
              linear-gradient(
                145deg,
                rgba(118,47,240,.30),
                rgba(118,47,240,.06)
              );

            color: #d7c3ff;

            font-size: 11px;
            font-weight: 700;
          }

          /* =====================================================
             CONTENT
          ====================================================== */

          .seller-dashboard__content {
            position: relative;
            z-index: 2;

            width: min(
              1120px,
              calc(100% - 40px)
            );

            margin: 0 auto;

            padding: 38px 0 80px;
          }

          .seller-dashboard__hero {
            margin-bottom: 26px;
          }

          .seller-dashboard__eyebrow {
            margin-bottom: 8px;

            color: var(--sd-purple-light);

            font-family: 'JetBrains Mono', monospace;

            font-size: 8px;
            font-weight: 500;

            letter-spacing: .18em;
          }

          .seller-dashboard__hero h1 {
            margin: 0;

            font-family: Sora, sans-serif;

            font-size: clamp(
              28px,
              4vw,
              43px
            );

            font-weight: 600;

            line-height: 1.12;

            letter-spacing: -.04em;
          }

          .seller-dashboard__hero h1 span {
            color: var(--sd-purple-light);
          }

          .seller-dashboard__hero p {
            max-width: 650px;

            margin: 9px 0 0;

            color: var(--sd-muted);

            font-size: 12px;
            line-height: 1.6;
          }

          /* =====================================================
             OVERVIEW
          ====================================================== */

          .seller-overview {
            display: grid;

            grid-template-columns:
              minmax(0, 1.9fr)
              minmax(260px, 1fr);

            gap: 16px;

            align-items: stretch;
          }

          .seller-score-area {
            min-width: 0;
          }

          .seller-score-area .magic-bento-grid {
            height: 100%;
          }

          .seller-score-area .magic-bento-card {
            min-height: 292px;
            height: 100%;
          }

          .seller-metrics {
            min-width: 0;
          }

          .seller-metrics .metric-bento-grid {
            height: 100%;
          }

          /* =====================================================
             SCORE CONTENT
          ====================================================== */

          .score-content {
            min-height: 292px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .score-content__top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
          }

          .score-content__label {
            color: var(--sd-muted);

            font-family: 'JetBrains Mono', monospace;

            font-size: 9px;
            letter-spacing: .12em;

            text-transform: uppercase;
          }

          .score-content__value-row {
            margin-top: 10px;

            display: flex;
            align-items: flex-end;
            gap: 13px;
          }

          .score-content__value {
            font-family: Sora, sans-serif;

            font-size: clamp(
              62px,
              7vw,
              82px
            );

            font-weight: 600;
            line-height: .90;

            letter-spacing: -.07em;

            background:
              linear-gradient(
                135deg,
                #ffffff 10%,
                #d5c6ef 65%
              );

            -webkit-background-clip: text;
            background-clip: text;

            color: transparent;
          }

          .score-content__tier {
            margin-bottom: 6px;

            padding: 6px 12px;

            border-radius: 999px;

            border: 1px solid rgba(210,187,255,.34);

            background: rgba(210,187,255,.06);

            color: var(--sd-purple-light);

            font-size: 9px;
            font-weight: 600;
          }

          .score-content__icon {
            width: 44px;
            height: 44px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 10px;

            border: 1px solid rgba(210,187,255,.28);

            background: rgba(118,47,240,.10);

            color: var(--sd-purple-light);
          }

          .score-content__bottom {
            margin-top: auto;
          }

          .score-content__bar-label {
            display: flex;
            justify-content: space-between;

            margin-bottom: 7px;

            color: var(--sd-muted-2);

            font-size: 8px;
          }

          .score-content__bar {
            width: 100%;
            height: 7px;

            overflow: hidden;

            border-radius: 999px;

            background: rgba(255,255,255,.06);
          }

          .score-content__bar span {
            display: block;
            height: 100%;

            border-radius: inherit;

            background:
              linear-gradient(
                90deg,
                #6718d8,
                #bfa3ff
              );

            box-shadow:
              0 0 18px
              rgba(118,47,240,.5);
          }

          .score-content__note {
            display: flex;
            align-items: center;
            gap: 7px;

            margin-top: 17px;

            color: #a9a3af;

            font-size: 10px;
          }

          .score-content__note svg {
            color: var(--sd-green);
          }

          /* =====================================================
             METRICS
          ====================================================== */

          .metric-bento-grid {
            display: grid;

            grid-template-columns: repeat(2, minmax(0, 1fr));

            gap: 12px;
          }

          .metric-bento-card {
            position: relative;

            min-height: 140px;

            padding: 19px;

            display: flex;
            flex-direction: column;

            justify-content: space-between;

            overflow: hidden;

            border-radius: 16px;

            border: 1px solid rgba(255,255,255,.08);

            background:
              linear-gradient(
                145deg,
                rgba(21,24,26,.94),
                rgba(17,20,21,.94)
              );

            transition:
              transform .18s ease,
              border-color .18s ease,
              box-shadow .18s ease;
          }

          .metric-bento-card:hover {
            transform: translateY(-2px);

            border-color:
              rgba(210,187,255,.20);

            box-shadow:
              0 16px 34px
              rgba(0,0,0,.20);
          }

          .metric-bento-card__icon {
            width: 31px;
            height: 31px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 8px;

            color: var(--sd-purple-light);

            background:
              rgba(118,47,240,.10);
          }

          .metric-bento-card__label {
            margin-top: 18px;

            color: var(--sd-muted);

            font-family: 'JetBrains Mono', monospace;

            font-size: 8px;
            letter-spacing: .10em;
          }

          .metric-bento-card__value {
            margin-top: 5px;

            font-family: Sora, sans-serif;

            font-size: 23px;
            font-weight: 600;

            color: var(--sd-text);
          }

          .metric-bento-card--positive
          .metric-bento-card__value {
            color: var(--sd-green);
          }

          .metric-bento-card--negative
          .metric-bento-card__value {
            color: var(--sd-red);
          }

          /* =====================================================
             ACTION GRID
          ====================================================== */

          .seller-action-grid {
            margin-top: 16px;

            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr);

            gap: 16px;
          }

          .seller-action-grid .magic-bento-grid {
            height: 100%;
          }

          .seller-action-grid .magic-bento-card {
            min-height: 285px;
            height: 100%;
          }

          /* =====================================================
             TIPS
          ====================================================== */

          .performance-content {
            min-height: 285px;
            display: flex;
            flex-direction: column;
          }

          .panel-title {
            display: flex;
            align-items: center;
            gap: 9px;
          }

          .panel-title svg {
            color: var(--sd-purple-light);
          }

          .panel-title h3 {
            margin: 0;

            font-family: Sora, sans-serif;

            font-size: 17px;
            font-weight: 600;
          }

          .performance-intro {
            margin: 8px 0 22px;

            color: var(--sd-muted);

            font-size: 10px;
            line-height: 1.55;
          }

          .performance-list {
            display: flex;
            flex-direction: column;

            gap: 18px;
          }

          .performance-item {
            display: grid;
            grid-template-columns: 31px 1fr;
            gap: 11px;
          }

          .performance-number {
            width: 27px;
            height: 27px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background:
              linear-gradient(
                145deg,
                #f9d85a,
                #dcae18
              );

            color: #241d0a;

            font-size: 10px;
            font-weight: 700;
          }

          .performance-item strong {
            display: block;

            margin-bottom: 3px;

            color: #ece7ef;

            font-size: 10px;
            font-weight: 600;
          }

          .performance-item p {
            margin: 0;

            color: var(--sd-muted);

            font-size: 9px;
            line-height: 1.55;
          }

          /* =====================================================
             GRIEVANCE
          ====================================================== */

          .grievance-content {
            min-height: 285px;

            display: flex;
            flex-direction: column;
          }

          .grievance-intro {
            margin: 8px 0 18px;

            color: var(--sd-muted);

            font-size: 10px;
          }

          .grievance-form {
            display: flex;
            flex-direction: column;

            gap: 9px;

            margin-top: auto;
          }

          .grievance-label {
            color: var(--sd-muted-2);

            font-size: 8px;
            font-family: 'JetBrains Mono', monospace;

            text-transform: uppercase;
            letter-spacing: .08em;
          }

          .grievance-input,
          .grievance-textarea {
            width: 100%;

            box-sizing: border-box;

            border-radius: 8px;

            border: 1px solid rgba(255,255,255,.08);

            background:
              rgba(7,9,10,.65);

            color: #eeeaf2;

            outline: none;

            font-family: Inter, sans-serif;

            font-size: 10px;
          }

          .grievance-input {
            height: 38px;

            padding: 0 11px;
          }

          .grievance-textarea {
            min-height: 74px;

            padding: 11px;

            resize: none;
          }

          .grievance-input::placeholder,
          .grievance-textarea::placeholder {
            color: #514c56;
          }

          .grievance-input:focus,
          .grievance-textarea:focus {
            border-color: rgba(210,187,255,.30);

            box-shadow:
              0 0 0 2px
              rgba(118,47,240,.08);
          }

          .grievance-button {
            width: 100%;
            margin-top: 2px;
          }

          /* =====================================================
             PREMIUM
          ====================================================== */

          .seller-premium {
            min-height: 100px;

            margin-top: 16px;

            padding: 21px 24px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 22px;

            border-radius: 16px;

            border: 1px solid
              rgba(255,255,255,.10);

            background:
              radial-gradient(
                circle at 0% 50%,
                rgba(255,255,255,.15),
                transparent 30%
              ),
              linear-gradient(
                105deg,
                #5e14d1 0%,
                #7831df 40%,
                #9a87ef 100%
              );

            box-shadow:
              0 16px 45px
              rgba(79,31,160,.12);
          }

          .seller-premium__content {
            display: flex;
            align-items: center;
            gap: 13px;
          }

          .seller-premium__icon {
            width: 40px;
            height: 40px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: white;
          }

          .seller-premium h2 {
            margin: 0;

            font-family: Sora, sans-serif;

            font-size: 23px;
            font-weight: 600;

            color: white;
          }

          .seller-premium p {
            margin: 4px 0 0;

            color: rgba(255,255,255,.73);

            font-size: 9px;
          }

          .premium-button {
            flex-shrink: 0;
          }

          .premium-button__label {
            display: inline-flex;
            align-items: center;
            gap: 7px;
          }

          /* =====================================================
             ORDERS
          ====================================================== */

          .seller-orders {
            margin-top: 16px;

            padding: 23px;

            border-radius: 16px;

            border: 1px solid rgba(255,255,255,.08);

            background:
              linear-gradient(
                145deg,
                rgba(20,23,24,.92),
                rgba(15,18,19,.92)
              );

            box-shadow:
              0 16px 40px
              rgba(0,0,0,.08);
          }

          .seller-orders__header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 18px;

            margin-bottom: 18px;
          }

          .seller-orders__title-row {
            display: flex;
            align-items: center;
            gap: 9px;
          }

          .seller-orders__title-row svg {
            color: var(--sd-purple-light);
          }

          .seller-orders h2 {
            margin: 0;

            font-family: Sora, sans-serif;

            font-size: 17px;
            font-weight: 600;
          }

          .seller-orders__header p {
            margin: 5px 0 0;

            color: var(--sd-muted-2);

            font-size: 9px;
          }

          .seller-history-button {
            display: inline-flex;
            align-items: center;
            gap: 3px;

            border: 0;
            background: transparent;

            color: var(--sd-purple-light);

            font-size: 9px;
            font-weight: 600;

            cursor: pointer;
          }

          .seller-orders__table-wrap {
            overflow-x: auto;
          }

          .seller-orders__table {
            width: 100%;
            min-width: 640px;

            border-collapse: collapse;
          }

          .seller-orders__table th {
            padding: 12px 8px;

            text-align: left;

            color: var(--sd-muted-2);

            font-family: 'JetBrains Mono', monospace;

            font-size: 7px;
            font-weight: 500;

            letter-spacing: .07em;
          }

          .seller-orders__table td {
            padding: 13px 8px;

            border-top:
              1px solid
              rgba(255,255,255,.055);

            color: #a49eaa;

            font-size: 9px;
          }

          .seller-orders__table tr:hover td {
            background:
              rgba(255,255,255,.014);
          }

          .seller-orders__table .order-id {
            color: #e4dfea;
            font-weight: 600;
          }

          .order-status {
            display: inline-flex;

            padding: 4px 9px;

            border-radius: 999px;

            font-size: 8px;
            font-weight: 600;
          }

          .order-status--success {
            color: #70e4b2;

            background:
              rgba(75,210,143,.10);

            border:
              1px solid
              rgba(75,210,143,.14);
          }

          .order-status--processing {
            color: #f2d264;

            background:
              rgba(242,190,47,.09);

            border:
              1px solid
              rgba(242,190,47,.13);
          }

          .order-status--danger {
            color: #ff9aa2;

            background:
              rgba(255,95,108,.09);

            border:
              1px solid
              rgba(255,95,108,.13);
          }

          .order-status--neutral {
            color: #b7b0bb;

            background:
              rgba(255,255,255,.04);

            border:
              1px solid
              rgba(255,255,255,.07);
          }

          .seller-orders__empty {
            min-height: 180px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            color: var(--sd-muted-2);

            text-align: center;
          }

          .seller-orders__empty p {
            margin: 10px 0 3px;

            color: #9f98a6;

            font-size: 10px;
          }

          .seller-orders__empty span {
            font-size: 8px;
          }

          /* =====================================================
             FOOTER
          ====================================================== */

          .seller-footer {
            position: relative;
            z-index: 2;

            border-top:
              1px solid
              rgba(255,255,255,.07);

            background: rgba(10,13,14,.88);
          }

          .seller-footer__inner {
            width: min(
              1120px,
              calc(100% - 40px)
            );

            min-height: 100px;

            margin: 0 auto;

            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 25px;
          }

          .seller-footer__brand {
            font-family: Sora, sans-serif;

            font-size: 12px;
            font-weight: 700;
          }

          .seller-footer__links {
            display: flex;
            flex-wrap: wrap;

            justify-content: center;

            gap: 22px;
          }

          .seller-footer__links a {
            color: var(--sd-muted-2);

            font-size: 8px;

            text-decoration: none;

            transition: color .18s ease;
          }

          .seller-footer__links a:hover {
            color: #e9e4ed;
          }

          .seller-footer__copy {
            color: var(--sd-muted-2);

            font-size: 8px;
          }

          /* =====================================================
             LOADER
          ====================================================== */

          .seller-loader {
            min-height: 430px;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-direction: column;

            gap: 13px;

            border-radius: 16px;

            border: 1px solid
              rgba(255,255,255,.08);

            background:
              rgba(19,23,24,.70);
          }

          .seller-loader__spinner {
            width: 27px;
            height: 27px;

            border:
              2px solid
              rgba(210,187,255,.13);

            border-top-color:
              var(--sd-purple-light);

            border-radius: 50%;

            animation:
              seller-spin .7s linear infinite;
          }

          .seller-loader p {
            margin: 0;

            color: var(--sd-muted);

            font-size: 9px;
          }

          @keyframes seller-spin {
            to {
              transform: rotate(360deg);
            }
          }

          /* =====================================================
             RESPONSIVE
          ====================================================== */

          @media (max-width: 900px) {

            .seller-overview {
              grid-template-columns: 1fr;
            }

            .seller-score-area .magic-bento-card {
              min-height: 260px;
            }

            .seller-action-grid {
              grid-template-columns: 1fr;
            }

            .seller-premium {
              align-items: flex-start;
              flex-direction: column;
            }

            .seller-premium__content {
              width: 100%;
            }

            .premium-button {
              width: 100%;
            }

          }

          @media (max-width: 640px) {

            .seller-dashboard__header-inner,
            .seller-dashboard__content,
            .seller-footer__inner {
              width: min(
                100% - 24px,
                1120px
              );
            }

            .seller-dashboard__content {
              padding-top: 28px;
              padding-bottom: 45px;
            }

            .seller-dashboard__hero {
              margin-bottom: 19px;
            }

            .seller-dashboard__hero h1 {
              font-size: 29px;
            }

            .seller-dashboard__hero p {
              font-size: 10px;
            }

            .metric-bento-grid {
              grid-template-columns: 1fr 1fr;
            }

            .metric-bento-card {
              min-height: 115px;
              padding: 15px;
            }

            .metric-bento-card__value {
              font-size: 19px;
            }

            .seller-orders {
              padding: 16px;
            }

            .seller-orders__header {
              align-items: flex-start;
            }

            .seller-history-button {
              padding-top: 3px;
            }

            .seller-footer__inner {
              padding: 28px 0;

              flex-direction: column;
            }

            .seller-footer__links {
              gap: 13px;
            }

          }

          @media (prefers-reduced-motion: reduce) {

            .seller-loader__spinner {
              animation: none;
            }

          }

        `}</style>

      </div>
    </PortalLayout>
  )
}


/* =========================================================
   SCORE CONTENT
========================================================= */

function ScoreContent({ score }) {
  const percentage = Math.min(
    100,
    Math.max(0, score / 10)
  )

  const tier =
    score >= 800
      ? 'Excellent'
      : score >= 700
        ? 'Good'
        : score >= 600
          ? 'Fair'
          : 'Needs Attention'

  return (
    <div className="score-content">

      <div className="score-content__top">

        <div>

          <div className="score-content__label">
            YOUR CREDIBILITY SCORE
          </div>

          <div className="score-content__value-row">

            <span className="score-content__value">
              {score}
            </span>

            <span className="score-content__tier">
              {tier}
            </span>

          </div>

        </div>

        <div className="score-content__icon">
          <Award size={20} />
        </div>

      </div>


      <div className="score-content__bottom">

        <div className="score-content__bar-label">
          <span>Score strength</span>
          <span>{Math.round(percentage)}%</span>
        </div>

        <div className="score-content__bar">
          <span
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="score-content__note">
          <TrendingUp size={14} />
          Keep delivering reliable customer experiences.
        </div>

      </div>

    </div>
  )
}


/* =========================================================
   METRIC BENTO
========================================================= */

function MetricBento({ items }) {
  return (
    <div className="metric-bento-grid">

      {items.map((item) => (

        <div
          key={item.id}
          className={[
            'metric-bento-card',
            item.positive
              ? 'metric-bento-card--positive'
              : '',
            item.negative
              ? 'metric-bento-card--negative'
              : '',
          ].join(' ')}
        >

          <div className="metric-bento-card__icon">
            {item.icon}
          </div>

          <div>
            <div className="metric-bento-card__label">
              {item.label}
            </div>

            <div className="metric-bento-card__value">
              {item.value}
            </div>
          </div>

        </div>

      ))}

    </div>
  )
}


/* =========================================================
   PERFORMANCE TIPS
========================================================= */

function PerformanceTips() {

  const tips = [
    {
      title: 'Maintain Shipping Speed',
      description:
        'Faster order dispatch improves your score and customer trust.',
    },
    {
      title: 'Respond to Queries',
      description:
        'Timely replies reduce disputes and build better ratings.',
    },
    {
      title: 'Maintain Compliance',
      description:
        'Keep your business information updated and verified.',
    },
  ]

  return (
    <div className="performance-content">

      <div className="panel-title">
        <Sparkles size={17} />
        <h3>Performance Tips</h3>
      </div>

      <p className="performance-intro">
        Improve your seller credibility through simple
        operational habits.
      </p>

      <div className="performance-list">

        {tips.map((tip, index) => (

          <div
            className="performance-item"
            key={tip.title}
          >

            <div className="performance-number">
              {index + 1}
            </div>

            <div>
              <strong>
                {tip.title}
              </strong>

              <p>
                {tip.description}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}


/* =========================================================
   GRIEVANCE
========================================================= */

function GrievanceCard() {

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const submit = (event) => {
    event.preventDefault()

    if (
      !subject.trim() ||
      !message.trim()
    ) {
      toast({
        title: 'Complete the grievance form',
        description:
          'Please provide a subject and description.',
        variant: 'destructive',
      })

      return
    }

    toast({
      title: 'Grievance submitted',
      description:
        'Your grievance has been recorded.',
    })

    setSubject('')
    setMessage('')
  }

  return (
    <div className="grievance-content">

      <div className="panel-title">
        <Flag size={17} />
        <h3>Submit Grievance</h3>
      </div>

      <p className="grievance-intro">
        Have an issue? Submit it directly to the
        SC Score team.
      </p>

      <form
        className="grievance-form"
        onSubmit={submit}
      >

        <label className="grievance-label">
          Subject
        </label>

        <input
          value={subject}
          onChange={(event) =>
            setSubject(event.target.value)
          }
          placeholder="e.g. Order issue"
          className="grievance-input"
        />

        <label className="grievance-label">
          Description
        </label>

        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Describe the issue or concern..."
          className="grievance-textarea"
        />

        <SpecularButton
          type="submit"
          size="md"
          radius={24}
          tint="#8b5cf6"
          tintOpacity={0.85}
          blur={4}
          textColor="#ffffff"
          lineColor="#ffffff"
          baseColor="#c4b5fd"
          intensity={1.05}
          shineSize={10}
          shineFade={40}
          thickness={1}
          speed={0.35}
          followMouse
          proximity={240}
          className="grievance-button"
        >
          Submit Dispute
          <ArrowRight size={13} />
        </SpecularButton>

      </form>

    </div>
  )
}


/* =========================================================
   STATUS
========================================================= */

function StatusBadge({ value }) {

  const normalized =
    String(value || '')
      .toLowerCase()

  let className =
    'order-status order-status--neutral'

  if (
    normalized.includes('deliver') ||
    normalized.includes('success') ||
    normalized.includes('complete')
  ) {
    className =
      'order-status order-status--success'
  }

  if (
    normalized.includes('processing') ||
    normalized.includes('pending') ||
    normalized.includes('ship')
  ) {
    className =
      'order-status order-status--processing'
  }

  if (
    normalized.includes('cancel') ||
    normalized.includes('refund') ||
    normalized.includes('dispute')
  ) {
    className =
      'order-status order-status--danger'
  }

  return (
    <span className={className}>
      {value || 'Pending'}
    </span>
  )
}


/* =========================================================
   LOADER
========================================================= */

function DashboardLoader() {
  return (
    <div className="seller-loader">

      <div className="seller-loader__spinner" />

      <p>
        Loading seller intelligence...
      </p>

    </div>
  )
}


/* =========================================================
   CLOCK ICON
========================================================= */

function ClockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path d="M12 7v5l3 2" />
    </svg>
  )
}


/* =========================================================
   DATE
========================================================= */

function formatDate(value) {

  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  )
}