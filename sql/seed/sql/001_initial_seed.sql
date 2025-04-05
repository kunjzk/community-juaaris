-- Initial seed data for Community Juaaris
-- Generated on 2024-04-05

-- Declare variables to store UUIDs (for reference in future seeds)
DO $$
DECLARE
    -- Team UUIDs
    kkr_id UUID := uuid_generate_v4();
    srh_id UUID := uuid_generate_v4();
    csk_id UUID := uuid_generate_v4();
    dc_id UUID := uuid_generate_v4();
    gt_id UUID := uuid_generate_v4();
    rr_id UUID := uuid_generate_v4();
    mi_id UUID := uuid_generate_v4();
    lsg_id UUID := uuid_generate_v4();
    rcb_id UUID := uuid_generate_v4();
    pbks_id UUID := uuid_generate_v4();

    -- Venue UUIDs
    kolkata_id UUID := uuid_generate_v4();
    hyderabad_id UUID := uuid_generate_v4();
    chennai_id UUID := uuid_generate_v4();
    visakhapatnam_id UUID := uuid_generate_v4();
    ahmedabad_id UUID := uuid_generate_v4();
    guwahati_id UUID := uuid_generate_v4();
    mumbai_id UUID := uuid_generate_v4();
    lucknow_id UUID := uuid_generate_v4();
    bengaluru_id UUID := uuid_generate_v4();
    new_chandigarh_id UUID := uuid_generate_v4();
    jaipur_id UUID := uuid_generate_v4();
    delhi_id UUID := uuid_generate_v4();
    dharamsala_id UUID := uuid_generate_v4();

    -- Juaari UUIDs
    pratibha_id UUID := uuid_generate_v4();
    anshu_id UUID := uuid_generate_v4();
    madan_id UUID := uuid_generate_v4();
    reena_id UUID := uuid_generate_v4();
    suresh_id UUID := uuid_generate_v4();
    pamela_id UUID := uuid_generate_v4();
    sanjeev_id UUID := uuid_generate_v4();
    archit_id UUID := uuid_generate_v4();
    slaks_id UUID := uuid_generate_v4();
    sanjana_id UUID := uuid_generate_v4();
    rajiv_id UUID := uuid_generate_v4();
    nidhi_id UUID := uuid_generate_v4();
    prachi_id UUID := uuid_generate_v4();
    kunal_id UUID := uuid_generate_v4();

BEGIN
    -- Insert Teams
    INSERT INTO teams (id, name) VALUES
    (kkr_id, 'KKR'),
    (srh_id, 'SRH'),
    (csk_id, 'CSK'),
    (dc_id, 'DC'),
    (gt_id, 'GT'),
    (rr_id, 'RR'),
    (mi_id, 'MI'),
    (lsg_id, 'LSG'),
    (rcb_id, 'RCB'),
    (pbks_id, 'PBKS');

    -- Insert Venues
    INSERT INTO venues (id, name) VALUES
    (kolkata_id, 'Kolkata'),
    (hyderabad_id, 'Hyderabad'),
    (chennai_id, 'Chennai'),
    (visakhapatnam_id, 'Visakhapatnam'),
    (ahmedabad_id, 'Ahmedabad'),
    (guwahati_id, 'Guwahati'),
    (mumbai_id, 'Mumbai'),
    (lucknow_id, 'Lucknow'),
    (bengaluru_id, 'Bengaluru'),
    (new_chandigarh_id, 'New Chandigarh'),
    (jaipur_id, 'Jaipur'),
    (delhi_id, 'Delhi'),
    (dharamsala_id, 'Dharamsala');

    -- Insert Juaaris (Players)
    INSERT INTO juaaris (id, display_name, is_purple_capped, is_orange_capped, winnings, defaults_remaining) VALUES
    (pratibha_id, 'Pratibha', FALSE, FALSE, -20.8, 5),
    (anshu_id, 'Anshu', FALSE, FALSE, -61.7, 5),
    (madan_id, 'Madan', FALSE, FALSE, -9.2, 5),
    (reena_id, 'Reena', FALSE, FALSE, -30.2, 5),
    (suresh_id, 'Suresh', FALSE, TRUE, -67.5, 5),
    (pamela_id, 'Pamela', FALSE, FALSE, 53.8, 5),
    (sanjeev_id, 'Sanjeev', TRUE, FALSE, 94.7, 5),
    (archit_id, 'Archit', FALSE, FALSE, 32.8, 5),
    (slaks_id, 'S.Laks', FALSE, FALSE, 2.5, 5),
    (sanjana_id, 'Sanjana', FALSE, FALSE, 53.8, 5),
    (rajiv_id, 'Rajiv', FALSE, FALSE, 2.5, 5),
    (nidhi_id, 'Nidhi', FALSE, FALSE, 7.2, 5),
    (prachi_id, 'Prachi', FALSE, FALSE, -24.3, 5),
    (kunal_id, 'Kunal', FALSE, FALSE, -33.7, 5);

    -- Output UUIDs for reference in future seeds
    RAISE NOTICE E'\n--- Team UUIDs ---';
    RAISE NOTICE 'KKR: %', kkr_id;
    RAISE NOTICE 'SRH: %', srh_id;
    RAISE NOTICE 'CSK: %', csk_id;
    RAISE NOTICE 'DC: %', dc_id;
    RAISE NOTICE 'GT: %', gt_id;
    RAISE NOTICE 'RR: %', rr_id;
    RAISE NOTICE 'MI: %', mi_id;
    RAISE NOTICE 'LSG: %', lsg_id;
    RAISE NOTICE 'RCB: %', rcb_id;
    RAISE NOTICE 'PBKS: %', pbks_id;

    RAISE NOTICE E'\n--- Venue UUIDs ---';
    RAISE NOTICE 'Kolkata: %', kolkata_id;
    RAISE NOTICE 'Hyderabad: %', hyderabad_id;
    RAISE NOTICE 'Chennai: %', chennai_id;
    RAISE NOTICE 'Visakhapatnam: %', visakhapatnam_id;
    RAISE NOTICE 'Ahmedabad: %', ahmedabad_id;
    RAISE NOTICE 'Guwahati: %', guwahati_id;
    RAISE NOTICE 'Mumbai: %', mumbai_id;
    RAISE NOTICE 'Lucknow: %', lucknow_id;
    RAISE NOTICE 'Bengaluru: %', bengaluru_id;
    RAISE NOTICE 'New Chandigarh: %', new_chandigarh_id;
    RAISE NOTICE 'Jaipur: %', jaipur_id;
    RAISE NOTICE 'Delhi: %', delhi_id;
    RAISE NOTICE 'Dharamsala: %', dharamsala_id;

    RAISE NOTICE E'\n--- Juaari UUIDs ---';
    RAISE NOTICE 'Pratibha: %', pratibha_id;
    RAISE NOTICE 'Anshu: %', anshu_id;
    RAISE NOTICE 'Madan: %', madan_id;
    RAISE NOTICE 'Reena: %', reena_id;
    RAISE NOTICE 'Suresh: %', suresh_id;
    RAISE NOTICE 'Pamela: %', pamela_id;
    RAISE NOTICE 'Sanjeev: %', sanjeev_id;
    RAISE NOTICE 'Archit: %', archit_id;
    RAISE NOTICE 'S.Laks: %', slaks_id;
    RAISE NOTICE 'Sanjana: %', sanjana_id;
    RAISE NOTICE 'Rajiv: %', rajiv_id;
    RAISE NOTICE 'Nidhi: %', nidhi_id;
    RAISE NOTICE 'Prachi: %', prachi_id;
    RAISE NOTICE 'Kunal: %', kunal_id;
END $$; 