import streamlit as st
import os
import json
import tempfile
from PIL import Image
from core.vlm_connector import GeminiConnector
from core.rag_engine import RAGEngine
from debug_monitor.telemetry import Telemetry

st.set_page_config(page_title="Prescription Digitizer Prototype", layout="wide", page_icon="🏥")

# --- Custom CSS for Bigger Text and Premium UX ---
def inject_custom_css():
    st.markdown("""
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

            html, body, [class*="st-"] {
                font-family: 'Inter', sans-serif;
                font-size: 24px; /* Minimum 24px */
            }

            .main {
                background-color: #f8fafc;
            }

            /* Premium Card Look for Sections */
            div.stMetric {
                background: white;
                padding: 15px;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                border: 1px solid #e2e8f0;
            }

            /* Bigger Headings */
            h1 { font-size: 34px !important; font-weight: 700 !important; color: #1e293b !important; }
            h2 { font-size: 32px !important; font-weight: 700 !important; color: #334155 !important; }
            h3 { font-size: 30px !important; font-weight: 600 !important; color: #475569 !important; }
            h4 { font-size: 28px !important; font-weight: 600 !important; color: #0052CC !important; margin-bottom: 1rem !important; }


            /* Buttons */
            .stButton>button {
                width: 100%;
                border-radius: 8px;
                height: 3em;
                background-color: #0052CC;
                color: white;
                font-weight: 600;
                border: none;
                transition: all 0.2s;
            }
            .stButton>button:hover {
                background-color: #0747a6;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
            }

            /* Container styling */
            [data-testid="stVerticalBlock"] > div:has(div.stMarkdown) {
                /* background: white;
                padding: 20px;
                border-radius: 16px; 
                margin-bottom: 20px; */
            }

            /* Sidebar */
            [data-testid="stSidebar"] {
                background-color: #ffffff;
                border-right: 1px solid #e2e8f0;
            }
            
            /* Metric labels */
            [data-testid="stMetricLabel"] {
                font-size: 1.1rem !important;
                color: #64748b !important;
            }
            
            /* Metric values */
            [data-testid="stMetricValue"] {
                font-size: 1.8rem !important;
                font-weight: 700 !important;
            }
        </style>
    """, unsafe_allow_html=True)

inject_custom_css()

st.title("👨‍⚕️ Prescription Digitizer")
st.markdown("<p style='font-size: 1.2rem; color: #64748b;'>Advanced OCR & Scientific Validation Engine</p>", unsafe_allow_html=True)
st.markdown("---")


# Sidebar for configuration
with st.sidebar:
    st.header("Settings")
    api_key = st.text_input("Gemini API Key", type="password", value=os.getenv("GEMINI_API_KEY", ""))
    if api_key:
        os.environ["GEMINI_API_KEY"] = api_key
    
    st.markdown("---")
    st.subheader("System Telemetry")
    stats = Telemetry.get_stats()
    st.write(f"RAM Usage: {stats['ram_mb']:.2f} MB")
    st.write(f"CPU Usage: {stats['cpu_percent']}%")

    st.markdown("---")
    st.header("Patient History")
    
    history_data = [
        {"date": "12 Feb 2026", "diag": "Viral Fever", "meds": ["Paracetamol", "Cough Syrup"]},
        {"date": "28 Jan 2026", "diag": "Hypertension", "meds": ["Amlodipine 5mg", "Telmisartan"]},
        {"date": "10 Dec 2025", "diag": "General Checkup", "meds": ["Multivitamin", "Calcium"]}
    ]
    
    for visit in history_data:
        with st.expander(f"{visit['date']} - {visit['diag']}"):
            st.caption("Prescribed:")
            for med in visit['meds']:
                st.write(f"• {med}")
            st.button("View Full Rx", key=visit['date'])


def render_digital_twin(data):
    """Render the structured prescription data as a clean Digital Twin UI."""
    
    if data.get("parse_error"):
        st.error("⚠️ Could not parse structured output. Showing raw text:")
        st.text_area("Raw Output", data.get("raw_text", ""), height=400)
        return

    # ── Header (P3) ──────────────────────────────────────
    header = data.get("header", {})
    if header and any(header.values()):
        st.markdown("#### 🏥 Hospital Details")
        h_cols = st.columns([2, 2])
        with h_cols[0]:
            if header.get("hospital_name"):
                st.markdown(f"**{header['hospital_name']}**")
            if header.get("address"):
                st.caption(header["address"])
            if header.get("contact"):
                st.caption(f"📞 {header['contact']}")
        with h_cols[1]:
            if header.get("doctor_name"):
                st.markdown(f"**Dr. {header['doctor_name']}**")
            if header.get("doctor_degrees"):
                st.caption(header["doctor_degrees"])

    st.markdown("---")

    # ── Patient Info (P1) ────────────────────────────────
    patient = data.get("patient", {})
    st.markdown("#### 👤 Patient Information")
    p_cols = st.columns(4)
    
    fields = [
        ("Name", patient.get("name")),
        ("Age", patient.get("age")),
        ("Sex", patient.get("sex")),
        ("Date", patient.get("date"))
    ]
    
    for i, (label, value) in enumerate(fields):
        with p_cols[i]:
            if value:
                st.metric(label, value)
            else:
                st.metric(label, "—")
                st.caption("⚠️ Missing")

    # ── Diagnosis (P2) ───────────────────────────────────
    diag = data.get("diagnosis") or data.get("chief_complaint")
    if diag:
        st.markdown("---")
        st.markdown("#### 🩺 Diagnosis / Chief Complaint")
        st.info(diag)

    # ── Investigations ───────────────────────────────────
    investigations = data.get("investigations", [])
    if investigations:
        st.markdown("#### 🔬 Investigations")
        for inv in investigations:
            st.write(f"• {inv}")

    # ── Validation Warnings ────────────────────────────────────────
    warnings = data.get("_validation_warnings", [])
    if warnings:
        st.markdown("---")
        st.markdown("#### ⚠️ Dosage Corrections Applied")
        for w in warnings:
            st.warning(w)

    # ── Medicines (P1 - Core) ────────────────────────────
    medicines = data.get("medicines", [])
    if medicines:
        st.markdown("---")
        st.markdown("#### 💊 Prescribed Medicines")
        
        # Wrapping in a styled container
        with st.container():
            # Table header
            med_cols = st.columns([0.5, 3, 1.5, 2, 2])
            med_cols[0].markdown("**#**")
            med_cols[1].markdown("**Medicine**")
            med_cols[2].markdown("**Strength**")
            med_cols[3].markdown("**Frequency**")
            med_cols[4].markdown("**Duration**")
            st.markdown("<hr style='margin: 0.5rem 0; border: 0.5px solid #e2e8f0;'>", unsafe_allow_html=True)
            
            for i, med in enumerate(medicines):
                cols = st.columns([0.5, 3, 1.5, 2, 2])
                route = med.get("route", "")
                name = med.get("name", "Unknown")
                display = f"<span style='color: #0052CC; font-weight: 600;'>{route}.</span> {name}" if route else name
                
                # Highlight corrected fields
                name_flag = " <span title='Validated'>✅</span>" if med.get("_name_corrected") else ""
                strength_flag = " <span title='Corrected'>✔️</span>" if med.get("_strength_corrected") else ""
                
                cols[0].write(f"**{i+1}**")
                cols[1].markdown(f"{display}{name_flag}", unsafe_allow_html=True)
                cols[2].markdown(f"{(med.get('strength') or '—')}{strength_flag}", unsafe_allow_html=True)
                cols[3].write(med.get("frequency") or "—")
                cols[4].write(med.get("duration") or "—")
                if i < len(medicines) - 1:
                    st.markdown("<hr style='margin: 0.2rem 0; border: 0.2px solid #f1f5f9;'>", unsafe_allow_html=True)


    # ── Advice ───────────────────────────────────────────
    advice = data.get("advice", [])
    if advice:
        st.markdown("---")
        st.markdown("#### 📋 Advice")
        for a in advice:
            st.write(f"• {a}")

    # ── Follow-up Visits ─────────────────────────────────
    visits = data.get("visits", [])
    if visits:
        st.markdown("---")
        st.markdown("#### 📅 Follow-up Visits")
        for v_idx, visit in enumerate(visits):
            with st.expander(f"Visit {v_idx + 2}: {visit.get('date', 'Unknown Date')}"):
                if visit.get("diagnosis"):
                    st.info(visit["diagnosis"])
                
                v_meds = visit.get("medicines", [])
                if v_meds:
                    for j, m in enumerate(v_meds):
                        route = m.get("route", "")
                        name = m.get("name", "Unknown")
                        display = f"{route}. {name}" if route else name
                        freq = m.get("frequency") or "—"
                        dur = m.get("duration") or "—"
                        st.write(f"{j+1}. {display} | {freq} | {dur}")
                
                v_advice = visit.get("advice", [])
                if v_advice:
                    st.caption("Advice:")
                    for a in v_advice:
                        st.write(f"• {a}")

    # ── Follow-up ────────────────────────────────────────
    follow_up = data.get("follow_up")
    if follow_up:
        st.markdown("---")
        st.success(f"🗓 Follow-up: {follow_up}")


# Main content
uploaded_file = st.file_uploader("Upload a handwritten prescription image", type=["jpg", "jpeg", "png"])

if uploaded_file:
    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.name)[1]) as tmp:
        tmp.write(uploaded_file.getvalue())
        tmp_path = tmp.name

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("📸 Original Image")
        st.image(uploaded_file, width="stretch")

    if st.button("🚀 Digitize Prescription"):
        with st.spinner("🔍 Extracting structured data via Gemini 2.0 Flash..."):
            try:
                connector = GeminiConnector()
                rag = RAGEngine()
                
                # Single-Shot Extraction
                result = connector.extract_structured(tmp_path)
                
                # Post-Validation: Cross-check against dosage DB
                if not result.get("parse_error"):
                    result = rag.validate_prescription(result)
                
                with col2:
                    st.subheader("📋 Digital Prescription")
                    render_digital_twin(result)
                
                # Debug: Show raw JSON
                with st.expander("🔧 Raw JSON Output"):
                    st.json(result)
                
                # Show log trace
                st.markdown("---")
                st.subheader("📊 Scientific Log Trace")
                if os.path.exists("logs/scientific_debug.log"):
                    with open("logs/scientific_debug.log", "r") as f:
                        logs = f.readlines()[-20:]
                        st.code("".join(logs))
                
            except Exception as e:
                st.error(f"Error during processing: {str(e)}")
            finally:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
else:
    st.info("Please upload an image to start.")
